import { Container } from "./styles";
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'

export function Summary() {
    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Imagem"/>
                </header>
                <strong>R$500</strong>
            </div>
            <div>
                <header>
                    <p>Saida</p>
                    <img src={outcomeImg} alt="Saídas"/>
                </header>
                <strong>R$5002</strong>
            </div>
            <div className="test">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total"/>
                </header>
                <strong>R$10</strong>
            </div>
        </Container>
    )
}