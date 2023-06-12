/// Use the D3 library to read from the CSV file ///

const csv = "./clean_May_tracks.csv"

///Create a dropdown menu displaying the different variables///
function init() {
    let selector = d3.select("#selDataset");

    d3.csv(csv).then((data) => {
        console.log(data.columns);
        //attribute is the column head
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
        buildMetadata(firstAttribute);
    });
}

init();