import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  candidate: {
    height: 100,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
});

const Student = props => {
  const classes = useStyles()
  const candidate = props.candidate

  return (
    <Paper className={classes.candidate}>
      <Typography variant='h5' component='h2'>
        {candidate.name.lastName} {candidate.name.firstName}
      </Typography>
      <Typography color='textSecondary'>
        {candidate.studentId}
      </Typography>
    </Paper>
  )
}

export default Student