#' Arabidopsis QTL data on gravitropism
#'
#' Data from a QTL experiment on gravitropism in
#' Arabidopsis, with data on 162 recombinant inbred lines (Ler x
#' Cvi). The outcome is the root tip angle (in degrees) at two-minute
#' increments over eight hours.
#'
#' @docType data
#'
#' @usage data(grav)
#'
#' @format An object of class `"cross"`; see [qtl::read.cross()].
#'
#' @keywords datasets
#'
#' @references Moore CR, Johnson LS, Kwak I-Y, Livny M, Broman KW,
#' Spalding EP (2013) High-throughput computer vision introduces the
#' time axis to a quantitative trait map of a plant growth
#' response. Genetics 195:1077-1086
#' ([PubMed](https://www.ncbi.nlm.nih.gov/pubmed/23979570))
#'
#' @source Mouse Phenome Database, <https://phenome.jax.org/projects/Moore1b>
#'
#' @examples
#' data(grav)
#' times <- attr(grav, "time")
#' phe <- grav$pheno
#' \donttest{
#' iplotCurves(phe, times, phe[,c(61,121)], phe[,c(121,181)],
#'             chartOpts=list(curves_xlab="Time (hours)", curves_ylab="Root tip angle (degrees)",
#'                            scat1_xlab="Angle at 2 hrs", scat1_ylab="Angle at 4 hrs",
#'                            scat2_xlab="Angle at 4 hrs", scat2_ylab="Angle at 6 hrs"))}
"grav"
