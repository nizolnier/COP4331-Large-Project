import Scroller from "./Scroller"

import sampleShows from '../tests/sample_shows.json'

const Home = () => {
    return <Scroller cartoons={sampleShows}></Scroller>
}

export default Home