import { calculateSum } from "@alura/utils/math/sum";
import { Text } from "@alura/design-system/components/Text";

export default function HomeScreen() {
    return (
        <div>
            <Text tag="h1">Olá mundo!</Text>
            <p>Soma de 1 e 2 = {calculateSum(1, 2)}</p>
        </div>
    );
}
