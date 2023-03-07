import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import UserCard from "../components/UserCard";

jest.mock("axios")

const axiosResponseMock = {
    data: {
        firstName: "Oleta",
        lastName: "Abbott",
        bank:{
            cardNumber:"3589640949470047",
            cardExpire:"10/23"
        }
    }
}

describe("UserCard", () => {
    test("deve renderizar o loading e depois removê-lo após o carregamento", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<UserCard/>)

        const loading = screen.getByText(/loading\.\.\./i)
        expect(loading).toBeInTheDocument()

        await waitFor(() => {
            expect(loading).not.toBeInTheDocument()
        })        
    })

    test("deve renderizar o nome, sobrenome, número de cartão e data de validade", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<UserCard/>)

        await waitFor(() => {})
        
        const firstName = screen.getByText(/oleta/i)
        const lastName = screen.getByText(/abbott/i)
        const cardNumber = screen.getByText(/3589 6409 4947 0047/i)
        const cardExpire = screen.getByText(/10\/23/i)

        expect(firstName).toBeInTheDocument()
        expect(lastName).toBeInTheDocument()
        expect(cardNumber).toBeInTheDocument()
        expect(cardExpire).toBeInTheDocument()
    })
})
