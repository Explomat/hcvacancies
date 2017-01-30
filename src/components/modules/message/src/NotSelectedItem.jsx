import React from 'react';

class NotSelectedItem extends React.Component {

    handleRemoveFromNotSelected(){
        if (this.props.onRemoveNotSelected) {
            this.props.onRemoveNotSelected(this.props.id);
        }
    }

    render(){
        const {fullname} = this.props;
        return (
            <div onClick={::this.handleRemoveFromNotSelected} className="not-selected-item">
                <button className="not-selected-item__button event-btn">
                    <i className="icon-plus"></i>
                </button>
                <span className="not-selected-item__fullname">{fullname}</span>
            </div>
        );
    }
}

export default NotSelectedItem;