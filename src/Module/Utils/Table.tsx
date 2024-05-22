import React from "react";

export function createTable(content: string) {
    const c = content.split("\n");
    let t: string[][] = [];
    c.forEach((v) => {
        const spl = v.split("\t");
        t.push(spl);
    });

    return (
        <table className="table-auto bg-gray-200 border border-collapse border-slate-500 rounded-md">
            <tbody>
                {
                    t.map((v) => {
                        const i = v.map((b) => {
                            return <td className="p-4 border border-slate-500">{b}</td>
                        });
                        return <tr>
                            {i}
                        </tr>
                    })
                }
            </tbody>
        </table>
    );
}
