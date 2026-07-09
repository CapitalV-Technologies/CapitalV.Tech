import './ResinPage.css';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';
import { useState, useEffect } from "react";
import { getSingularResinData, getResinNames_Helper } from './HelperFunctions.tsx';
import type {Resin_t, Property_t, Data_t } from './Interfaces.tsx';


export default function ResinPage() {

    // Create variables to hold selected resins values
    const [selectedResin1, setSelectedResin1] = useState< Resin_t | null>(null);
    const [selectedResin2, setSelectedResin2] = useState< Resin_t | null>(null);
    const [selectedResin3, setSelectedResin3] = useState< Resin_t | null>(null);

    // Create variables to hold selected property values
    const [selectedProperty1, setSelectedProperty1] = useState< Property_t | null>(null);;
    const [selectedProperty2, setSelectedProperty2] = useState< Property_t | null>(null);;
    const [selectedProperty3, setSelectedProperty3] = useState< Property_t | null>(null);;

    // Create variable to hold all available resins
    const [resins, setResins] = useState<Resin_t[]>([]);

    // Create chart variables
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    // This function takes effect on page load
    useEffect(() => {
        getResinsNames();   
    }, []);

    const getResinsNames = async() => {
        const formattedResins = await getResinNames_Helper();
        setResins(formattedResins);
    }

    const refreshGraph = async () => {

        getResinsData();

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                },
                tooltip: {
                    callbacks: {
                        title: function(tooltipItems: any[]) {
                            // The title callback receives an array of items. 
                            // Grab the first one to read the x value.
                            if (tooltipItems.length > 0 && tooltipItems[0].parsed) {
                                return tooltipItems[0].parsed.x + " °C";
                            }
                            return '';
                        },
                        // Optional: add a footer to show extra info
                        footer: function(tooltipItems: any) {
                            return 'Potential Footer';
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: "Temperature (°C)",
                        color: "solid black",
                        font: {
                            size: 16,         
                            weight: 'bold',   
                            family: 'Arial'   
                        },
                        padding: {
                            top: 20,
                            
                        }
                    }
                },
                Property1: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: String(selectedProperty1 ? selectedProperty1.name : "Pick a property!")
                    },
                    grid: {
                        drawOnChartArea: false, 
                    },
                },
                Property2: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: String(selectedProperty2 ? selectedProperty2.name : "Pick a property!")
                    },
                    grid: {
                        drawOnChartArea: false, 
                    },
                },
                Property3: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: String(selectedProperty3 ? selectedProperty3.name : "Pick a property!")
                    },
                    grid: {
                        drawOnChartArea: false, 
                    },
                }
            }
        };

        setChartOptions(options);
    }


        const getResinsData = async () => {

            var resin1_property1: Data_t[] | null = await getSingularResinData(selectedResin1, selectedProperty1)
            var resin1_property2: Data_t[] | null = await getSingularResinData(selectedResin1, selectedProperty2)
            var resin1_property3: Data_t[] | null = await getSingularResinData(selectedResin1, selectedProperty3)
            var resin2_property1: Data_t[] | null = await getSingularResinData(selectedResin2, selectedProperty1)
            var resin2_property2: Data_t[] | null = await getSingularResinData(selectedResin2, selectedProperty2)
            var resin2_property3: Data_t[] | null = await getSingularResinData(selectedResin2, selectedProperty3)
            var resin3_property1: Data_t[] | null = await getSingularResinData(selectedResin3, selectedProperty1)
            var resin3_property2: Data_t[] | null = await getSingularResinData(selectedResin3, selectedProperty2)
            var resin3_property3: Data_t[] | null = await getSingularResinData(selectedResin3, selectedProperty3)
            
           
            const datasets = []

            if (resin1_property1 != null) {
                datasets.push({
                    label: selectedResin1!.name + ": " + selectedProperty1!.name,
                    data: resin1_property1,
                    fill: false,
                    borderColor: "black",
                    yAxisID: 'Property1',
                    tension: 0.4
                })
            }
            if (resin1_property2 != null) {
                datasets.push({
                    label: selectedResin1!.name + ": " + selectedProperty2!.name,
                    data: resin1_property2,
                    fill: false,
                    borderColor: "blue",
                    yAxisID: 'Property2',
                    tension: 0.4
                })
            }
            if (resin1_property3 != null) {
                datasets.push({
                    label: selectedResin1!.name + ": " + selectedProperty3!.name,
                    data: resin1_property3,
                    fill: false,
                    borderColor: "gray",
                    yAxisID: 'Property3',
                    tension: 0.4
                })
            }
            if (resin2_property1 != null) {
                datasets.push({
                    label: selectedResin2!.name + ": " + selectedProperty1!.name,
                    data: resin2_property1,
                    fill: false,
                    borderColor: "red",
                    yAxisID: 'Property1',
                    tension: 0.4
                })
            }
            if (resin2_property2 != null) {
                datasets.push({
                    label: selectedResin2!.name + ": " + selectedProperty2!.name,
                    data: resin2_property2,
                    fill: false,
                    borderColor: "green",
                    yAxisID: 'Property2',
                    tension: 0.4
                })
            }
            if (resin2_property3 != null) {
                datasets.push({
                    label: selectedResin2!.name + ": " + selectedProperty3!.name,
                    data: resin2_property3,
                    fill: false,
                    borderColor: "yellow",
                    yAxisID: 'Property3',
                    tension: 0.4
                })
            }
            if (resin3_property1 != null) {
                datasets.push({
                    label: selectedResin3!.name + ": " + selectedProperty1!.name,
                    data: resin3_property1,
                    fill: false,
                    borderColor: "pink",
                    yAxisID: 'Property1',
                    tension: 0.4
                })
            }
            if (resin3_property2 != null) {
                datasets.push({
                    label: selectedResin3!.name + ": " + selectedProperty2!.name,
                    data: resin3_property2,
                    fill: false,
                    borderColor: "purple",
                    yAxisID: 'Property2',
                    tension: 0.4
                })
            }
            if (resin3_property3 != null) {
                datasets.push({
                    label: selectedResin3!.name + ": " + selectedProperty3!.name,
                    data: resin3_property3,
                    fill: false,
                    borderColor: "brown",
                    yAxisID: 'Property3',
                    tension: 0.4
                })
            }

            const data2 = {
                    datasets: datasets
                }
            
            setChartData(data2);
        };

    const properties = [
        {name: "storage_modulus"},
        {name: "loss_modulus"},
        {name: "tan_delta"}
    ]



    return (
        <div className="resin-layout">
            <div className="dropdowns">

            <div className="titles">
                <h3> Select Resins </h3>
            </div>

            <Dropdown value={selectedResin1} onChange={(e) => setSelectedResin1(e.value)} options={resins} optionLabel="name"
                showClear placeholder="Select Resin 1" filter={true} filterBy="name" checkmark={true}/>
            <Dropdown value={selectedResin2} onChange={(e) => setSelectedResin2(e.value)} options={resins} optionLabel="name"
                showClear placeholder="Select Resin 2" filter={true} filterBy="name" checkmark={true}/>
            <Dropdown value={selectedResin3} onChange={(e) => setSelectedResin3(e.value)} options={resins} optionLabel="name"
                showClear placeholder="Select Resin 3" filter={true} filterBy="name" checkmark={true}/> 
            <div className="titles">
                <h3> Select Properties </h3>
            </div>
            <div className="subsection">
            <p> X-axis = temperature</p>
            </div>

            <Dropdown value={selectedProperty1} onChange={(e) => setSelectedProperty1(e.value)} options={properties} optionLabel="name"
                showClear placeholder="Select Property 1" filter={true} filterBy="name" checkmark={true}/> 
            <Dropdown value={selectedProperty2} onChange={(e) => setSelectedProperty2(e.value)} options={properties} optionLabel="name"
                showClear placeholder="Select Property 2" filter={true} filterBy="name" checkmark={true}/>
            <Dropdown value={selectedProperty3} onChange={(e) => setSelectedProperty3(e.value)} options={properties} optionLabel="name"
                showClear placeholder="Select Property 3" filter={true} filterBy="name" checkmark={true}/>
            <Button label="Refresh Graph" onClick={refreshGraph}/>
            </div>
            <Chart className="line-graph" type="line" data={chartData} options={chartOptions}/>
            
        </div>
    )
}