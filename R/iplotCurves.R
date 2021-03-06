## iplotCurves.R
## Karl W Broman

#' Plot of a bunch of curves, linked to points in scatterplots
#'
#' Creates an interactive graph with a panel having a number of curves
#' (say, a phenotype measured over time) linked to one or two (or no) scatter plots
#' (say, of the first vs middle and middle vs last times).
#'
#' @param curveMatrix Matrix (dim n_ind x n_times) with outcomes
#' @param times Vector (length n_times) with time points for the
#'   columns of curveMatrix
#' @param scatter1 Matrix (dim n_ind x 2) with data for the first
#'   scatterplot
#' @param scatter2 Matrix (dim n_ind x 2) with data for the second
#'   scatterplot
#' @param group Optional vector of groups of individuals (e.g., a genotype)
#' @param chartOpts A list of options for configuring the chart (see
#'   the coffeescript code). Each element must be named using the
#'   corresponding option.
#' @param digits Round data to this number of significant digits
#'     before passing to the chart function. (Use NULL to not round.)
#'
#' @return An object of class `htmlwidget` that will
#' intelligently print itself into HTML in a variety of contexts
#' including the R console, within R Markdown documents, and within
#' Shiny output bindings.
#'
#' @keywords hplot
#' @seealso [iplotCorr()], [iplot()], [scat2scat()]
#'
#' @examples
#' # random growth curves, based on some data
#' times <- 1:16
#' n <- 100
#' start <- rnorm(n, 5.2, 0.8)
#' slope1to5 <- rnorm(n, 2.6, 0.5)
#' slope5to16 <- rnorm(n, 0.24 + 0.09*slope1to5, 0.195)
#' y <- matrix(ncol=16, nrow=n)
#' y[,1] <- start
#' for(j in 2:5)
#'     y[,j] <- y[,j-1] + slope1to5
#' for(j in 6:16)
#'     y[,j] <- y[,j-1] + slope5to16
#' y <- y + rnorm(prod(dim(y)), 0, 0.35)
#'
#' \donttest{
#' iplotCurves(y, times, y[,c(1,5)], y[,c(5,16)],
#'             chartOpts=list(curves_xlab="Time", curves_ylab="Size",
#'                            scat1_xlab="Size at T=1", scat1_ylab="Size at T=5",
#'                            scat2_xlab="Size at T=5", scat2_ylab="Size at T=16"))}
#'
#' @export
iplotCurves <-
function(curveMatrix, times=NULL, scatter1=NULL, scatter2=NULL, group=NULL,
         chartOpts=NULL, digits=5)
{
    n.ind <- nrow(curveMatrix)
    n.times <- ncol(curveMatrix)
    if(is.null(times)) times <- 1:ncol(curveMatrix)
    if(length(times) != n.times)
        stop("length(times) != ncol(curveMatrix)")
    if(!is.null(scatter1) && nrow(scatter1) != n.ind)
        stop("nrow(scatter1) != nrow(curveMatrix)")
    if(!is.null(scatter2) && nrow(scatter2) != n.ind)
        stop("nrow(scatter2) != nrow(curveMatrix)")
    if(is.null(scatter1) && !is.null(scatter2)) {
        scatter1 <- scatter2
        scatter2 <- NULL
    }
    if(is.null(group)) group <- rep(1, n.ind)
    stopifnot(length(group) == n.ind)
    group <- group2numeric(group)
    indID <- rownames(curveMatrix)

    if(is.data.frame(curveMatrix)) curveMatrix <- as.matrix(curveMatrix)
    if(is.data.frame(scatter1)) scatter1 <- as.matrix(scatter1)
    if(is.data.frame(scatter2)) scatter2 <- as.matrix(scatter2)
    dimnames(curveMatrix) <- dimnames(scatter1) <- dimnames(scatter2) <- names(group) <- names(times) <- NULL
    if(!is.null(scatter1) && ncol(scatter1) < 2)
        stop("scatter1 should have two columns")
    if(!is.null(scatter2) && ncol(scatter2) < 2)
        stop("scatter2 should have two columns")

    data_list <- list(curve_data=list(x=list(times), y=curveMatrix, group=group, indID=indID))
    if(!is.null(scatter1))
        data_list$scatter1_data <- list(x=scatter1[,1], y=scatter1[,2], group=group, indID=indID)
    if(!is.null(scatter2))
        data_list$scatter2_data <- list(x=scatter2[,1], y=scatter2[,2], group=group, indID=indID)

    defaultAspect <- 1.25 # width/height
    browsersize <- getPlotSize(defaultAspect)

    x <- list(data=data_list, chartOpts=chartOpts)
    if(!is.null(digits))
        attr(x, "TOJSON_ARGS") <- list(digits=digits)

    htmlwidgets::createWidget("iplotCurves", x,
                              width=chartOpts$width,
                              height=chartOpts$height,
                              sizingPolicy=htmlwidgets::sizingPolicy(
                                  browser.defaultWidth=browsersize$width,
                                  browser.defaultHeight=browsersize$height,
                                  knitr.defaultWidth=1000,
                                  knitr.defaultHeight=1000/defaultAspect
                              ),
                              package="qtlcharts")
}

#' @rdname qtlcharts-shiny
#' @export
iplotCurves_output <- function(outputId, width="100%", height="1000") {
    htmlwidgets::shinyWidgetOutput(outputId, "iplotCurves", width, height, package="qtlcharts")
}

#' @rdname qtlcharts-shiny
#' @export
iplotCurves_render <- function(expr, env=parent.frame(), quoted=FALSE) {
    if(!quoted) { expr <- substitute(expr) } # force quoted
    htmlwidgets::shinyRenderWidget(expr, iplotCurves_output, env, quoted=TRUE)
}
