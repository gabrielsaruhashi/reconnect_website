import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class NativeSelects extends React.Component {
    state = {
        school: 'school',
    };

    handleChange = name => event => {
        console.log(event.target.value);
        this.props.OnSelectEvent({name: event.target.value});
        this.setState({ [name]: event.target.value });
    };

    renderOptions() {
        return this.props.fields.map(school => {
            return (
                <option 
                    key={school}
                    value={school}>
                {school}
                </option> 
            );
        });
    }

    render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
                <InputLabel>School</InputLabel>
                <Select
                native
                value={this.state.school}
                onChange={this.handleChange('school')}
                >
                {this.renderOptions()}
                </Select>
            </FormControl>
        </div>
    );
    }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelects);