/// Use the D3 library to read from the CSV file ///

const csv = "./clean_May_tracks.csv"

/*
data:
    [
        {col1: row1_val1, col2: row1_val2, col3: row1_val3}
        {col1: row2_val1, col2: row2_val2, col3: row2_val3}
    ]
*/
let csvData = [];

///Create a dropdown menu displaying the different variables///
function init() {
    let selector = d3.select("#selDataset");

    d3.csv(csv).then((data) => {
        csvData = data;

        console.log(data.columns);
        //attribute is the column header
        const attributes = data.columns.slice(3, data.columns.length - 1);
        console.log(attributes);

        // let sampleNames = data.names;

        attributes.forEach((attribute) => {
            selector
                .append("option")
                .text(attribute)
                .property("value", attribute);
        });
        //slice returned a new array, therefore attributes[0] is the 4th column in your dataset
        let firstAttribute = attributes[0];
        buildCharts(firstAttribute);
    });
}

function optionChanged(selectedAttribute) {
    console.log(selectedAttribute);
    buildCharts(selectedAttribute);
}

//create a function to retrieve variables for dropdown menu
// function getAttributes(data) {
//     const attributes = data.columns.slice(3, data.columns.length - 1);
//     return attributes;
// }

//// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual. ///
function buildCharts(attribute) {

    // Create a variable that filters the attributes 
    const sortedData = csvData.sort((rowA, rowB) => {
        if (rowA[attribute] == rowB[attribute]) {
            return 0
        } else if (rowA[attribute] > rowB[attribute]) {
            // acending comparison
            // return 1;
            // descending comparison
            return -1;
        } else {
            // ascending comparison
            // return -1;
            // descending comparison
            return 1;
        }
    });
    // console.log(sortedData);

    const topSortedData = sortedData.slice(0, 50);

    console.log(topSortedData);

    function getValueFromRowAttribute(row) {
        return row[attribute];
    }

    let yLabels = topSortedData.map(getValueFromRowAttribute);
    console.log(yLabels);

    function getTrackName(row) {
        return row["track.name"];
    }
    let xLabels = topSortedData.map(getTrackName);
    console.log(xLabels);

    let barData = [{
        x: xLabels,
        y: yLabels,
        text: yLabels,
        type: "bar"
    }];

    // Create layout for bar chart
    let barLayout = {
        title: "Top 50 Songs Found"
    };
    // Plot the graph
    Plotly.newPlot("bar", barData, barLayout);

}


init();