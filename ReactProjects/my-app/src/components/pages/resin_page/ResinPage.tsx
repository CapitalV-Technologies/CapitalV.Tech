import './ResinPage.css';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { supabase } from "../../../services/supabaseClient";
import { Button } from 'primereact/button';
import { useState, useEffect } from "react";


export default function ResinPage() {


    interface ItemDataRow {
        temperature: number;
        [key: string]: any;
    }

    // Create variables to hold selected resins values
    const [selectedResin1, setSelectedResin1] = useState<{ name: string; id: string } | null>(null);
    const [selectedResin2, setSelectedResin2] = useState<{ name: string; id: string } | null>(null);
    const [selectedResin3, setSelectedResin3] = useState<{ name: string; id: string } | null>(null);

    const [selectedProperty1, setSelectedProperty1] = useState<{ name: string } | null>(null);;
    const [selectedProperty2, setSelectedProperty2] = useState<{ name: string } | null>(null);;

    // Create variable for available resins
    const [resins, setResins] = useState<{ name: string, id: string}[]>([]);

   
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

            if (!selectedResin1) return;

            if (!selectedProperty1) {
                 console.log("Waiting for user to select a property...");
                return; 
                }

            if (!selectedProperty2) {
                 console.log("Waiting for user to select a property...");
                return; 
                }
        
            const { data, error } = await supabase
                .from("item_data")
                .select("temperature, item_id, " + selectedProperty1.name + ", " + selectedProperty2.name)
                .eq("item_id", selectedResin1.id)
                .range(0, 3000)
                .returns<ItemDataRow[]>()
        
            if (error) {
                console.error('Login error:', error.message);
                return;
            }
    
            console.log("My data:", data)

            //if (data) {
        
                const formattedData1 = data.map((item) => {
                    return { x: item.temperature, y: item[selectedProperty1.name] };
                });
              
            //setResins(formattedResins);

            const formattedData2 = data.map((item) => {
                    return { x: item.temperature, y: item[selectedProperty2.name] };
                });
               
    
            //};

           const data2 = {
            datasets: [
                {
                    label: String(selectedProperty1?.name || "Pick a property!"),
                    data: formattedData1,
                    fill: false,
                    borderColor: "black",
                    yAxisID: 'y',
                    tension: 0.4
                },
                {
                    label: String(selectedProperty2?.name || "Pick a property!"),
                    data: formattedData2,
                    fill: false,
                    borderColor: "blue",
                    yAxisID: 'y1',
                    tension: 0.4
                }
            ]
        };

        setChartData(data2);
        };

    const properties = [
        {name: "temperature"},
        {name: "storage_modulus"},
        {name: "loss_modulus"},
        {name: "tan_delta"}
    ]



    return (
        <div className="resin-layout">
            <div className="dropdowns">
            <h3> Select Resins </h3>

            <Dropdown value={selectedResin1} onChange={(e) => setSelectedResin1(e.value)} options={resins} optionLabel="name"
                showClear placeholder="Select Resin 1" className="w-full md:w-14rem" filter={true} filterBy="name" checkmark={true}/>
            <Dropdown value={selectedResin2} onChange={(e) => setSelectedResin2(e.value)} options={resins} optionLabel="name"
                showClear placeholder="Select Resin 2" className="w-full md:w-14rem" filter={true} filterBy="name" checkmark={true}/>
            <Dropdown value={selectedResin3} onChange={(e) => setSelectedResin3(e.value)} options={resins} optionLabel="name"
                showClear placeholder="Select Resin 3" className="w-full md:w-14rem" filter={true} filterBy="name" checkmark={true}/> 
            
            <h3> Select Properties </h3>
            <p> X-axis = temperature</p>

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