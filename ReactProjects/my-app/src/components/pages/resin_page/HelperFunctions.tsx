import { supabase } from "../../../services/supabaseClient.tsx";
import type { ItemDataRow, Property_t, Resin_t} from './Interfaces.tsx';

const getSingularResinData = async (resin: Resin_t | null, property: Property_t | null) => {

    if ((resin == null) || (property == null)) {
        // Can't call this function without both
        return null;
    }

    const { data, error } = await supabase
        .from("item_data")
        .select("temperature, item_id, " + property.name)
        .eq("item_id", resin.id)
        .range(0, 3000)
        .returns<ItemDataRow[]>()

    if (error) {
        console.error('Login error:', error.message);
        return null;
    }
    
    const formattedData = data.map((item) => {
        return { x: item["temperature"], y: item[property.name] };
    });

    return formattedData
};

const getResinNames_Helper = async () => {
        
    const { data, error } = await supabase
        .from("item_master")
        .select("*")

    if (error) {
        console.error('Login error:', error.message);
        return [];
    }

    if (data) {
        const formattedResins = data.map((item) => {
            return {
                name: item.item_name,
                id: item.item_id
            };
        });
        return formattedResins
    };

    return [];
};

export { getSingularResinData, getResinNames_Helper }