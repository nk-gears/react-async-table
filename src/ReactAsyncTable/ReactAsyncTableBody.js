import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from './helpers/helpers';

const propTypes = {
  keyField: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  selectedItems: PropTypes.object.isRequired,
  expandRow: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  totalColumns: PropTypes.number.isRequired,
  options: PropTypes.objectOf(PropTypes.bool).isRequired,
  translations: PropTypes.objectOf(PropTypes.string).isRequired,
  icons: PropTypes.objectOf(PropTypes.string).isRequired,
  actionsComponent: PropTypes.func,
  expandableRowComponent: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAction: PropTypes.func,
  onColumnClick: PropTypes.func.isRequired
};

const ReactAsyncTableBody = props => {
  const {
    keyField,
    item,
    selectedItems,
    expandRow,
    columns,
    translations,
    icons,
    actionsComponent,
    expandableRowComponent,
    totalColumns,
    options
  } = props;
  const itemID = item[keyField];
  const { editAction, deleteAction } = translations;
  const { editActionIcon, deleteActionIcon } = icons;
  const isExpandable = options.expandable;
  const ExpandableComponent = expandableRowComponent;

  const onExpand = () => props.onExpand(itemID);
  const onSelectClick = e => e.stopPropagation();
  const onEdit = e => {
    e.stopPropagation();
    
    props.onEdit(itemID, item);
  };
  const onDelete = e => {
    e.stopPropagation();

    props.onDelete(itemID);
  };
  const onAction = (e, type) => {
    e.stopPropagation();

    switch (type) {
      case 'EDIT_ITEM':
        props.onEdit(itemID, item);
        return;
      case 'DELETE_ITEM': 
        props.onDelete(itemID);
        return;
      default:
        break;
    }

    props.onAction(type, item);
  };

  const ColumnComponent = ({ column }) => {
    // Early exit if row has no data
    if (isEmpty(item)) return (<td />);

    const Component = column.formatedField;
    const columnKey = column.dataField || '';

    return (
      <td>
        {Component ? (
          <Component
            columnKey={columnKey}
            row={item}
            onColumnClick={props.onColumnClick}
          />
        ) : (
          <span>{item[columnKey]}</span>
        )}
      </td>
    );
  };

  ColumnComponent.propTypes = { column: PropTypes.object.isRequired };

  const ActionsComponent = () => {
    const Component = actionsComponent;

    return (
      <td className="action-col">
        {Component ? (
          <Component row={item} onAction={onAction} />
        ) : (
          <span>
            <button
              type="button"
              className="btn btn-link"
              onClick={onEdit}
              data-html="true"
              data-toggle="tooltip"
              title={editAction}
            >
              {editActionIcon ? <i className={editActionIcon} /> : <i>&#9997;</i>}
            </button>
            <button
              type="button"
              className="btn btn-link"
              data-toggle="tooltip"
              title={deleteAction}
              onClick={onDelete}
            >
              {deleteActionIcon ? <i className={deleteActionIcon} /> : <i>&minus;</i>}
            </button>
          </span>
        )}
      </td>
    );
  };

  return (
    <tbody>
      <tr className={isExpandable ? 'expandable-row' : ''} onClick={onExpand}>
        {options.multipleSelect && (
          <td>
            <div className="form-check">
              <input
                className="form-check-input position-static"
                type="checkbox"
                name={itemID}
                onClick={onSelectClick}
                onChange={props.onSelect}
                checked={selectedItems[itemID] || false}
              />
            </div>
          </td>
        )}
        {columns.map((column, index) => (
          <ColumnComponent key={index} column={column} />
        ))}
        {options.actionsColumn && (
          <ActionsComponent />
        )}
      </tr>
      {isExpandable && (
        <tr className={`collapse ${expandRow[itemID] ? 'show' : ''}`}>
          <td colSpan={totalColumns}>
            <ExpandableComponent row={item} />
          </td>
        </tr>
      )}
    </tbody>
  );
};

ReactAsyncTableBody.propTypes = propTypes;
export default ReactAsyncTableBody;
