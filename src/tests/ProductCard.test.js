import { render, screen, waitFor } from "@testing-library/react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

jest.mock("axios")

const axiosResponseMock = {
    data: {
        title: "MacBook Pro", 
        description: "MacBook Pro 2021 with mini-LED display may launch between September, November", 
        price: 1749, 
        thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png" 
    }
}

describe("ProductCard", () => {
    test("renderiza", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        render(<ProductCard/>)
        await waitFor(() => {})
    })

    test("deve renderizar o carregamento inicialmente", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        render(<ProductCard/>)

        const loading = screen.getByText(/loading\.\.\./i)
        expect(loading).toBeInTheDocument()

        expect(screen.queryByText(/macbook pro/i)).not.toBeInTheDocument()

        await waitFor(() => {})
    })

    test("deve renderizar o card corretamente após carregamento", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<ProductCard/>)       
        
        await waitFor(() => {
            const title = screen.getByRole("heading", {
                name: /macbook pro/i
            })

            expect(title).toBeInTheDocument()

            const thumbnail = screen.getByRole("img", {
                name: /thumbnail for macbook pro/i
            })

            expect(thumbnail).toBeInTheDocument()    
            
            const description = screen.getByText(
                /macbook pro 2021 with mini\-led display may launch between september, november/i
            )

            expect(description).toBeInTheDocument()

            const price = screen.getByText(/\$1749/i)

            expect(price).toBeInTheDocument()
        })

        expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
    })    
})