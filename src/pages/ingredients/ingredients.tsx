import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useLocation, useNavigate, useParams } from "react-router";

export default function IngredientPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const { id } = useParams();

    navigate(`/ingredients/${id}`, {state: {previousLocation: location}});

    return (
        <IngredientDetails />
    );
}