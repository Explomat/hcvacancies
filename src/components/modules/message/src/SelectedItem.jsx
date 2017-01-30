import React from 'react';

class SelectedItem extends React.Component {

    handleRemoveFromSelected(){
        if (this.props.onRemoveSelected) {
            this.props.onRemoveSelected(this.props.id);
        }
    }

    render(){
        const {fullname} = this.props;
        return (
            <div onClick={::this.handleRemoveFromSelected} className="selected-item">
                <button className="selected-item__button event-btn">
                    <i className="icon-minus"></i>
                </button>
                <span className="selected-item__fullname">{fullname}</span>
            </div>
        );
    }
}

export default SelectedItem;