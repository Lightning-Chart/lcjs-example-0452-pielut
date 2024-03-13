/*
 * LightningChartJS example that showcases usage of color lookup table on Pie.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const { PieChartTypes, lightningChart, LegendBoxBuilders, SliceLabelFormatters, SliceSorters, LUT, ColorRGBA, Themes } = lcjs

// Create a new color-value lookup table
const lut = new LUT({
    steps: [
        { value: 20, color: ColorRGBA(255, 0, 24) },
        { value: 40, color: ColorRGBA(255, 165, 44) },
        { value: 60, color: ColorRGBA(255, 255, 65) },
        { value: 80, color: ColorRGBA(0, 128, 24) },
        { value: 100, color: ColorRGBA(0, 0, 249) },
        { value: 120, color: ColorRGBA(134, 0, 125) },
    ],
    interpolate: true,
})

// Create a Pie Chart
const pie = lightningChart()
    .Pie({
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined
        type: PieChartTypes.LabelsOnSides,
    })
    .setTitle('Pie Chart')
    .setMultipleSliceExplosion(true)
    .setLabelFormatter(SliceLabelFormatters.NamePlusValue)
    .setSliceSorter(SliceSorters.None)
    // Attach lookup table
    .setLUT(lut)
    .setLabelConnectorGap(10)

const data = []

for (let i = 1; i <= 10; i++) data.push({ name: `Slice #${i}`, value: 1 + Math.random() * 120 })

// Create Slices
const slices = data.map((item) => pie.addSlice(item.name, item.value))

// Add LegendBox
pie.addLegendBox(LegendBoxBuilders.VerticalLegendBox)
    // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
    .setAutoDispose({
        type: 'max-width',
        maxWidth: 0.3,
    })
    .add(pie)

// 2 seconds after the example has loaded, change the values of each slice.
setTimeout(() => {
    slices.forEach((slice) => slice.setValue(1 + Math.random() * 120))
}, 2000)

// Change value of every slice regularly
setInterval(() => {
    slices.forEach((slice) => slice.setValue(1 + Math.random() * 120))
}, 5000)
