/*
 * LightningChartJS example that showcases usage of color lookup table on Pie.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    PieChartTypes,
    lightningChart,
    LegendBoxBuilders,
    SliceLabelFormatters,
    SliceSorters,
    LUT,
    ColorRGBA
} = lcjs

// Create a new color-value lookup table
const lut = new LUT( {
    steps: [
        { value: 20, color: ColorRGBA( 255, 0, 24 ) },
        { value: 40, color: ColorRGBA( 255, 165, 44 ) },
        { value: 60, color: ColorRGBA( 255, 255, 65 ) },
        { value: 80, color: ColorRGBA( 0, 128, 24 ) },
        { value: 100, color: ColorRGBA( 0, 0, 249 ) },
        { value: 120, color: ColorRGBA( 134, 0, 125 ) }
    ],
    interpolate: true
} )

// Create a Pie Chart
const pie = lightningChart()
    .Pie( { type: PieChartTypes.LabelsOnSides } )
    .setTitle( 'Pie Chart' )
    .setInnerRadius( 30 )
    .setAnimationsEnabled( true )
    .setMultipleSliceExplosion( true )
    .setLabelFormatter( SliceLabelFormatters.NamePlusValue )
    .setSliceSorter( SliceSorters.None )
    // Attach lookup table
    .setLUT( lut )
    .setLabelConnectorGap( 10 )

const data = []

for ( let i = 1; i <= 10; i++ )
    data.push( { name: `Slice #${i}`, value: 1 + Math.random() * 120 } )

// Create Slices
const slices = data.map( ( item ) => pie.addSlice( item.name, item.value ) )

// Add LegendBox
pie
    .addLegendBox( LegendBoxBuilders.VerticalLegendBox )
    .setPosition( { x: 0, y: 0 } )
    .setOrigin( { x: -1, y: -1 } )
    .setMargin( { bottom: 5, left: 5 } )
    .add( pie )

// Change value of every slice regularly
setInterval( () => {
    slices.forEach( ( slice ) => slice.setValue( 1 + Math.random() * 120 ) )
}, 5000 )