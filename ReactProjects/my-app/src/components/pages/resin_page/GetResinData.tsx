import { supabase } from "../../../services/supabaseClient";
import type { ItemDataRow} from './Interfaces.tsx';

const getResinsData2 = async (resinId: string, propertyName: string) => {

            const { data, error } = await supabase
                .from("item_data")
                .select("temperature, item_id, " + propertyName)
                .eq("item_id", resinId)
                .range(0, 3000)
                .returns<ItemDataRow[]>()
        
            if (error) {
                console.error('Login error:', error.message);
                return;
            }
            console.log(data)
            const formattedData = data.map((item) => {
                return { x: item.temperature, y: item[propertyName] };
            });

            return formattedData
    };

export { getResinsData2 }