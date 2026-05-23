import './ResinPage.css';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { supabase } from "../../../services/supabaseClient";
import { useState, useEffect } from "react";


export default function ResinPage() {

    // Create variables to hold selected resins values
    const [selectedResin1, setSelectedResin1] = useState(null);
    const [selectedResin2, setSelectedResin2] = useState(null);
    const [selectedResin3, setSelectedResin3] = useState(null);

   
    // const [chartData, setChartData] = useState({});
    // const [chartOptions, setChartOptions] = useState({});

    // useEffect(() => {
    //     const documentStyle = getComputedStyle(document.documentElement);
    //     const textColor = documentStyle.getPropertyValue('--text-color');
    //     const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    //     const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
    //     // Create mapper file to import data and match this stuff
    //     const data = {
    //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //         datasets: [
    //             {
    //                 label: 'First Dataset',
    //                 data: [65, 59, 80, 81, 56, 55, 40],
    //                 fill: false,
    //                 borderColor: documentStyle.getPropertyValue('--blue-500'),
    //                 tension: 0.4
    //             },
    //             {
    //                 label: 'Second Dataset',
    //                 data: [28, 48, 40, 19, 86, 27, 90],
    //                 fill: false,
    //                 borderColor: documentStyle.getPropertyValue('--pink-500'),
    //                 tension: 0.4
    //             }
    //         ]
    //     };
    //     const options = {
    //         maintainAspectRatio: false,
    //         aspectRatio: 0.6,
    //         plugins: {
    //             legend: {
    //                 labels: {
    //                     color: textColor
    //                 }
    //             }
    //         },
    //         scales: {
    //             x: {
    //                 ticks: {
    //                     color: textColorSecondary
    //                 },
    //                 grid: {
    //                     color: surfaceBorder
    //                 }
    //             },
    //             y: {
    //                 ticks: {
    //                     color: textColorSecondary
    //                 },
    //                 grid: {
    //                     color: surfaceBorder
    //                 }
    //             }
    //         }
    //     };

    //     setChartData(data);
    //     setChartOptions(options);
    // }, []);


    const getResins = async () => {
        
            const { data, error } = await supabase
                .from("item_master")
                .select("item_name")
                .eq("item_id", "466cb0a9-a74a-4f38-8df6-5031986711fc")
            if (error) {
                console.error('Login error:', error.message);
                return;
            }
    
            console.log("My items:", data)
    
            };

     const resins = [
        { name: 'John', code: 'Doe' },
        { name: 'Rome', code: 'RM1' },
        { name: 'Rome', code: 'RM' },
        { name: 'Rome', code: 'RM' },
        { name: 'Rome', code: 'RM' },
        { name: 'Rome', code: 'RM' },
        { name: 'Rome', code: 'RM' },
        { name: 'Rome', code: 'RM' },
        { name: 'Rome', code: 'RM' },
        { name: 'Rome', code: 'RM' },
        { name: 'Rome', code: 'RM' }
    ];

    return (
        <div className="resin-layout">
            <div className="dropdowns">
            <h2> Select Resins </h2>

            
            <Dropdown value={selectedResin1} onChange={getResins} options={resins} optionLabel="name"
                showClear placeholder="Select Resin 1" className="w-full md:w-14rem" filter={true} filterBy="name" checkmark={true}/>

               
            
            </div>
            {/* <Chart className="line-graph" type="line" data={chartData} options={chartOptions}/> */}
        </div>
    )
}