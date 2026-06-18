import './ResinPage.css';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { supabase } from "../../../services/supabaseClient";
import { Button } from 'primereact/button';
import { useState, useEffect } from "react";
import { getResinsData2 } from './GetResinData.tsx';
import type { ItemDataRow, Resin_t, Data_t } from './Interfaces.tsx';


export default function ResinPage() {

    // Create variables to hold selected resins values
    const [selectedResin1, setSelectedResin1] = useState< Resin_t | null>(null);
    const [selectedResin2, setSelectedResin2] = useState< Resin_t | null>(null);
    const [selectedResin3, setSelectedResin3] = useState< Resin_t | null>(null);

    const [selectedProperty1, setSelectedProperty1] = useState< Resin_t | null>(null);;
    const [selectedProperty2, setSelectedProperty2] = useState< Resin_t | null>(null);;

    // Create variable for available resins
    const [resins, setResins] = useState<Resin_t[]>([]);

   
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});


    // This function takes effect on page load
    useEffect(() => {

        // Call getResins Function
        getResinsNames();
        
    }, []);

    

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
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: String(selectedProperty1?.name || "Pick a property!")
                    },
                    grid: {
                        drawOnChartArea: false, 
                    },
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: String(selectedProperty2?.name || "Pick a property!")
                    },
                    grid: {
                        drawOnChartArea: false, 
                    },
                }
            }
        };

        setChartOptions(options);
    }

    


    const getResinsNames = async () => {
        
            const { data, error } = await supabase
                .from("item_master")
                .select("*")
        
            if (error) {
                console.error('Login error:', error.message);
                return;
            }
    
            console.log("My items:", data)

            if (data) {
        
                const formattedResins = data.map((item) => {
                    return {
                        name: item.item_name,
                        id: item.item_id
                    };
                });

            setResins(formattedResins);

    
            };
        };

        const getResinsData = async () => {

            if (!selectedProperty1) {
                 console.log("Waiting for user to select a property...");
                return; 
                }

            if (!selectedProperty2) {
                 console.log("Waiting for user to select a property...");
                return; 
                }
            

            var formattedData1: Data_t[] | undefined
            var formattedData2: Data_t[] | undefined
            var formattedData3: Data_t[] | undefined
            var formattedData4: Data_t[] | undefined
            var formattedData5: Data_t[] | undefined
            var formattedData6: Data_t[] | undefined

            
            if (selectedResin1) {
                formattedData1 = await getResinsData2(selectedResin1.id, selectedProperty1.name)
                formattedData2 = await  getResinsData2(selectedResin1.id, selectedProperty2.name)
            }
            if (selectedResin2) {
                formattedData3 = await getResinsData2(selectedResin2.id, selectedProperty1.name)
                formattedData4 = await getResinsData2(selectedResin2.id, selectedProperty2.name)
            }
            if (selectedResin3) {
                formattedData5 = await getResinsData2(selectedResin3.id, selectedProperty1.name)
                formattedData6 = await getResinsData2(selectedResin3.id, selectedProperty2.name)
            }
           
            const datasets = []

            if (selectedResin1) {

                datasets.push({
                    label: selectedResin1.name + ": " + selectedProperty1.name,
                    data: formattedData1,
                    fill: false,
                    borderColor: "black",
                    yAxisID: 'y',
                    tension: 0.4
                },
                {
                    label: selectedResin1.name + ": " + selectedProperty2.name,
                    data: formattedData2,
                    fill: false,
                    borderColor: "blue",
                    yAxisID: 'y1',
                    tension: 0.4
                })
            }
             if (selectedResin2) {
                datasets.push({
                    label: selectedResin2.name + ": " + selectedProperty1.name,
                    data: formattedData3,
                    fill: false,
                    borderColor: "pink",
                    yAxisID: 'y',
                    tension: 0.4
                },
                {
                    label: selectedResin2.name + ": " + selectedProperty2.name,
                    data: formattedData4,
                    fill: false,
                    borderColor: "green",
                    yAxisID: 'y1',
                    tension: 0.4
                })
            }
             if (selectedResin3) {
                datasets.push({
                    label: selectedResin3.name + ": " + selectedProperty1.name,
                    data: formattedData5,
                    fill: false,
                    borderColor: "red",
                    yAxisID: 'y',
                    tension: 0.4
                },
                {
                    label: selectedResin3.name + ": " + selectedProperty2.name,
                    data: formattedData6,
                    fill: false,
                    borderColor: "yellow",
                    yAxisID: 'y1',
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
                showClear placeholder="Select Resin 1" className="w-full md:w-14rem" filter={true} filterBy="name" checkmark={true}/>
            <Dropdown value={selectedResin2} onChange={(e) => setSelectedResin2(e.value)} options={resins} optionLabel="name"
                showClear placeholder="Select Resin 2" className="w-full md:w-14rem" filter={true} filterBy="name" checkmark={true}/>
            <Dropdown value={selectedResin3} onChange={(e) => setSelectedResin3(e.value)} options={resins} optionLabel="name"
                showClear placeholder="Select Resin 3" className="w-full md:w-14rem" filter={true} filterBy="name" checkmark={true}/> 
            <div className="titles">
                <h3> Select Properties </h3>
            </div>
            <div className="subsection">
            <p> X-axis = temperature</p>
            </div>

            <Dropdown value={selectedProperty1} onChange={(e) => setSelectedProperty1(e.value)} options={properties} optionLabel="name"
                showClear placeholder="Select Property 1" className="w-full md:w-14rem" filter={true} filterBy="name" checkmark={true}/> 
            <Dropdown value={selectedProperty2} onChange={(e) => setSelectedProperty2(e.value)} options={properties} optionLabel="name"
                showClear placeholder="Select Property 2" className="w-full md:w-14rem" filter={true} filterBy="name" checkmark={true}/>
            
            <Button label="Compare" onClick={refreshGraph}/>
            </div>
            <Chart className="line-graph" type="line" data={chartData} options={chartOptions}/>
            
        </div>
    )
}