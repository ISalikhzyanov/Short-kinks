import React from 'react';

const LinkList = ({links}) => {
    if (!links.length) {
        return <p className='center'>Ссылок пока нет</p>
    }


    return (
        <table className="tab" style={{width: "100%", margin: "5px"}}>
            <thead>
            <tr>

                <th>Исходная ссылка</th>
                <th>Короткая ссылка</th>
                <th>Количество переходов по ссылке</th>
            </tr>
            </thead>

            <tbody>
            {links.map((link) => {
                    return (
                        <tr key={link.id}>

                            <td className='target'>{link.target}</td>
                            <td>
                                <a href={`http://79.143.31.216/s/${link.short}`}
                                onClick={()=>{navigator.clipboard.writeText(`http://79.143.31.216/s/${link.short}`);window.alert('Ссылка скопирована')}}
                                >{link.short} </a>
                            </td>
                            <td>{link.counter}</td>

                        </tr>
                    )
                }
            )}

            </tbody>
        </table>
    );
};

export default LinkList;