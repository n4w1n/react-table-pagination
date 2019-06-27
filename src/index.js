import React from 'react';
import { render } from 'react-dom';
import ReactTable from 'react-table';
import namor from 'namor';
import 'react-table/react-table.css';
import './index.css';
import Pagination from './Pagination';
import * as serviceWorker from './serviceWorker';

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newPerson = () => {
    const statusChance = Math.random();
    return {
        firstName: namor.generate({ words: 1, numbers: 0 }),
        lastName: namor.generate({ words: 1, numbers: 0 }),
        age: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status:
            statusChance > 0.66
                ? 'relationship'
                : statusChance > 0.33
                ? 'complicated'
                : 'single'
    };
};

export function makeData(len = 200) {
    return range(len).map(d => {
        return newPerson();
    });
}

const App = () => (
    <ReactTable
        PaginationComponent={Pagination}
        data={makeData()}
        defaultPageSize={12}
        columns={[
            {
                Header: 'First Name',
                accessor: 'firstName',
                minWidth: 300
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
                minWidth: 300
            },
            {
                Header: 'Age',
                accessor: 'age',
                minWidth: 300
            },
            {
                Header: 'Status',
                accessor: 'status',
                minWidth: 300
            },
            {
                Header: 'Visits',
                accessor: 'visits',
                minWidth: 300
            }
        ]}
    />
);

render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
