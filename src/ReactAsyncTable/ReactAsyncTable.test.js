import React from 'react';
import { shallow } from 'enzyme';
import ReactAsyncTable from 'index';

describe('ReactAsyncTable', () => {
  it('renders without crashing', () => {
    const columns = [
      {
        dataField: 'id',
        text: 'ID'
      },
      {
        dataField: 'display_name',
        text: 'Name'
      },
      {
        dataField: 'number',
        text: 'Number'
      },
      {
        dataField: 'mobile',
        text: 'Mobile'
      }
    ];
    const items = [
      {
        id: 1,
        display_name: 'Testing Data',
        number: '123456789',
        mobile: '123456789'
      }
    ];
    const wrapper = shallow(<ReactAsyncTable 
      keyField="id"
      columns={columns}
      items={items}
      currentPage={1}
      itemsPerPage={10}
      totalItems={items.length}
      delay={300}
      onChangePage={page => console.log('page', page)}
      onSearch={search => console.log('page', search)}
    />);
    
    expect(wrapper).toHaveLength(1);
  });
});
