import React from 'react'
import { myContext } from './App'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function InvoiceForm() {

    const {myCurrency , myTax}= React.useContext(myContext)

    const [data, setData] = React.useState({
        cname: "",
        pname: "",
        pqty: "",
        pprice: ""
    })

    function collectData(event) {
        //logic to collect data and store it in 4 keys
        let enteredData = event.target.value

        if (enteredData) {
            setData({ ...data, [event.target.name]: enteredData })
        }

    }

    function generatePDF()
    {
        //Logic to first generate the image than the pdf
        const invoiceData = document.querySelector('.invoicedata')

        html2canvas(invoiceData)
        .then(function(data)
        {
            const imgData = data.toDataURL("img/png")
            const document = new jsPDF("l","mm","a4")

            const width = document.internal.pageSize.getWidth()
            const height = document.internal.pageSize.getHeight()

            document.addImage(imgData,"PNG",100,100,width,height)

            document.save("invoice.pdf")
        })
        .catch(function(error)
        {
            alert(error)
        })

    }

    return (
        <div style={{ marginLeft: 600 }}>
            <h3>Date:{new Date().toLocaleString()}</h3>
            <h3>Invoice Number: <input type='number' className="block w-20 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /></h3>

            <div>
                <label>Customer Name: </label>
                <input type="text" name="cname" onChange={collectData} className="block w-50 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                <label>Product Name: </label>
                <input type="text" name="pname" onChange={collectData} className="block w-50 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                <label>Product Quantity: </label>
                <input type="text" name="pqty" onChange={collectData} className="block w-50 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                <label>Product Price: </label>
                <input type="text" name="pprice" onChange={collectData} className="block w-50 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                <label>Currency: </label>
                <input type="text" name="currency" value={myCurrency} onChange={collectData} className="block w-50 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                <label>Tax: </label>
                <input type="text" name="tax" value={myTax} onChange={collectData} className="block w-50 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

            </div>
            <div className='invoicedata'>
                <h2>Customer Name: {data.cname}</h2>
                <h2>Product Name: {data.pname}</h2>
                <h2>Product Quantity: {data.pqty}</h2>
                <h2>Product Price: {data.pprice}</h2>
                <h2>Currency: {myCurrency}</h2>
                <h2>Tax: {data.pprice * 0.18}</h2>
            </div>

            <button  onClick={generatePDF} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Download</button>
        </div>
    )
}

export default InvoiceForm