import React from 'react'
import './Table.scss';

function Table({ countriesTableData }) {
    return (
        <div className="table">
            <table>
                <tbody>
                    {countriesTableData.map(({ country, cases }) => (
                        <tr key={country}>
                            <td>{country}</td>
                            <td>
                                <strong>
                                    {cases}
                                </strong>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table
