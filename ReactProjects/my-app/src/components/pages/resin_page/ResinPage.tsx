import './ResinPage.css';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { ListBox } from 'primereact/listbox';
import { useState, useEffect } from "react";


export default function ResinPage() {


    const [selectedResin, setSelectedResin] = useState(null);

    const resins = [
        { name: 'John', code: 'Doe' },
        { name: 'Rome', code: 'RM' },
    ];
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        // Create mapper file to import data and match this stuff
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                }
            ]
        };
        const options = {
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
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    return (
        <div className="resin-layout">
            <div className="listboxes">
            <ListBox filter value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
            className="w-full md:w-14rem" listStyle={{ maxHeight: '50px' }} />
            <ListBox filter value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
            className="w-full md:w-14rem" listStyle={{ maxHeight: '50px' }} />
            </div>
            <div className="dropdowns">
            <Dropdown value={selectedResin} onChange={(e) => setSelectedResin(e.value)} options={resins} optionLabel="name"
                placeholder="Select Resin 1" editable={true}/>
            <Dropdown value={selectedResin} onChange={(e) => setSelectedResin(e.value)} options={resins} optionLabel="name"
                placeholder="Select Resin 2" editable={true}/>
            <Dropdown value={selectedResin} onChange={(e) => setSelectedResin(e.value)} options={resins} optionLabel="name"
                placeholder="Select Resin 3" editable={true}/>
            </div>
            <Chart className="line-graph" type="line" data={chartData} options={chartOptions}/>
        </div>
    )
}