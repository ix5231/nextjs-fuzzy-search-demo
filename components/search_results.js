import Grid from '@material-ui/core/Grid'
import FlipMove from 'react-flip-move'
import Student from './student'

const SearchResults = props => (
  <Grid container justify="center" spacing={4} style={{ 'position': 'relative' }}>
    {/* Use 'wrapper-less' mode to make grid working */}
    <FlipMove
      duration={100}
      easing="ease-out"
      enterAnimation="fade"
      // Workaround for messing up animations when state is changed rapidly
      // See also: https://github.com/joshwcomeau/react-flip-move/issues/195
      leaveAnimation={null}
      typeName={null}
    >
      {props.candidates.map(candidate => (
        <Grid item key={candidate.id} xs={4}>
          <Student candidate={candidate} />
        </Grid>
      ))}
    </FlipMove>
  </Grid>
)

export default SearchResults