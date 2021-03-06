% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/iplotMScanone.R
\name{iplotMScanone}
\alias{iplotMScanone}
\title{Interactive LOD curve}
\usage{
iplotMScanone(scanoneOutput, cross = NULL, lodcolumn = NULL,
  pheno.col = NULL, times = NULL, effects = NULL, chr = NULL,
  chartOpts = NULL, digits = 5)
}
\arguments{
\item{scanoneOutput}{Object of class `"scanone"`, as output
from [qtl::scanone()].}

\item{cross}{(Optional) Object of class `"cross"`, see
[qtl::read.cross()].}

\item{lodcolumn}{Numeric value indicating LOD score column to plot.}

\item{pheno.col}{(Optional) Phenotype column in cross object.}

\item{times}{(Optional) Vector (length equal to the number of LOD
score columns) with quantitative values to which the different LOD
score columns correspond (times of measurements, or something like
age or dose).  These need to be ordered and equally-spaced. If
omitted, the names of the columns in `scanoneOutput` are used
and treated as qualitative.}

\item{effects}{(Optional) Estimated QTL effects, as obtained with
[estQTLeffects()].}

\item{chr}{(Optional) Optional vector indicating the chromosomes
for which LOD scores should be calculated. This should be a vector
of character strings referring to chromosomes by name; numeric
values are converted to strings. Refer to chromosomes with a
preceding - to have all chromosomes but those considered. A logical
(TRUE/FALSE) vector may also be used.}

\item{chartOpts}{A list of options for configuring the chart (see
the coffeescript code). Each element must be named using the
corresponding option.}

\item{digits}{Round data to this number of significant digits
before passing to the chart function. (Use NULL to not round.)}
}
\value{
An object of class `htmlwidget` that will
intelligently print itself into HTML in a variety of contexts
including the R console, within R Markdown documents, and within
Shiny output bindings.
}
\description{
Creates an interactive graph of a set of single-QTL genome scans, as
calculated by [qtl::scanone()]. If `cross` or
`effects` are provided, LOD curves will be linked to a panel
with estimated QTL effects.
}
\details{
If `cross` is provided, Haley-Knott regression is
used to estimate QTL effects at each pseudomarker.
}
\examples{
data(grav)
library(qtl)
grav <- calc.genoprob(grav, step=1)
grav <- reduce2grid(grav)

# we're going to subset the phenotypes
phecol <- seq(1, nphe(grav), by=5)

# the times were saved as an attributed
times <- attr(grav, "time")[phecol]

# genome scan
out <- scanone(grav, phe=phecol, method="hk")

\donttest{
# plot with qualitative labels on y-axis
iplotMScanone(out)}

\donttest{
# plot with quantitative y-axis
iplotMScanone(out, times=times)}

# estimate QTL effect for each time point at each genomic position
eff <- estQTLeffects(grav, phe=seq(1, nphe(grav), by=5), what="effects")

\donttest{
# plot with QTL effects included (and with quantitative y-axis)
iplotMScanone(out, effects=eff, times=times,
              chartOpts=list(eff_ylab="QTL effect", eff_xlab="Time (hrs)"))}

}
\seealso{
[iplotScanone()]
}
\keyword{hplot}
