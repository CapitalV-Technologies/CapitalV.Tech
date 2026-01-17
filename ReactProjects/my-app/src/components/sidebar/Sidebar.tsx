import './Sidebar.css';
import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from 'react-router-dom';

type SidebarProps = {
    isVisible: boolean;
}

export default function SideBar({isVisible}: SidebarProps) {

    const navigate = useNavigate();

    const menu_items = [
        {
            label: "Home",
            id: "1",
            icon: "pi pi-home",
            command: () => {
                navigate('/app')
            },
            
        },
        {
            label: "Resins",
            id: "2",
            icon: "pi pi-wrench",
            command: () => {
                navigate('/app/resin')
            },
        },
        {
            label: "Contact",
            id: "3",
            icon: "pi pi-address-book",
            command: () => {
                navigate('/app/contact')
            },
        },
        {
            label: "Settings",
            id: "4",
            icon: "pi pi-cog",
            command: () => {
                navigate('/app/settings')
            },
        }
    ]
    return (
        <div className={isVisible ? "sidebar sidebar-open" : "sidebar sidebar-close"}>
            <h1 className="sidebar-header">Menu</h1>
            <div>
            <PanelMenu model={menu_items}/>
            </div>
        </div>
    );
}