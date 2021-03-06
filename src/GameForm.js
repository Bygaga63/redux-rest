import React from "react";
import classnames from "classnames";
import {connect} from "react-redux";
import  {saveGame} from "./actions";

class GameForm extends React.Component {
    state = {
        _id: this.props.game ? this.props.game._id: null,
        title: this.props.game ? this.props.game.title:  "",
        cover: this.props.game ? this.props.game.cover: "",
        errors: {},
        loading: false
    };

    //удаление ошибок, сохранение в state.
    handleChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            //удаление ошибок в нужном инпуте
            let errors = {...this.state.errors};
            delete errors[e.target.name];
            //сохранение значения в state
            this.setState({
                [e.target.name]: e.target.value,
                errors
            });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    };

    //проверка на ошибки
    handleSubmit = (e) => {
        e.preventDefault();
        //валидация
        let errors = {};
        if (this.state.title === "") errors.title = "Can't be empty";
        if (this.state.cover === "") errors.cover = "Can't be empty";
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            const {title, cover} = this.state;
            // this.setState({loading: true})
            this.props.saveGame({title, cover});
        }
    };
    render() {
        return (
            <form className={classnames("ui form", {loading: this.state.loading})} onSubmit={this.handleSubmit} action="">
                <div>
                    <h1>Add new game</h1>

                    <div className={classnames("field", {error: !!this.state.title})}>
                        <label htmlFor="title">Title</label>
                        <div><input
                            id="title"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                            <span>{this.state.errors.title}</span>
                        </div>
                    </div>
                    <div className={classnames("field", {error: !!this.state.cover})}>
                        <label htmlFor="cover">Cover URL</label>
                        <div><input
                            id="cover"
                            name="cover"
                            value={this.state.cover}
                            onChange={this.handleChange}
                        />
                            <span>{this.state.errors.cover}</span>
                        </div>
                    </div>
                    <div className="field">
                        {this.state.cover !== "" &&
                        <img src={this.state.cover} alt="cover" className="ui small bordered image"/>}
                    </div>
                    <div className="field">
                        <button className="ui primary button">Save</button>
                    </div>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state, props) {
    const { match } = props;
    if(match.params._id) {
        return {
            game: state.games.find(item => item._id === match.params._id)
        }
    }
    return {game: null};
}

export default connect(mapStateToProps, {saveGame})(GameForm);