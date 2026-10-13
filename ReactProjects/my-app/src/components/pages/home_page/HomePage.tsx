import './HomePage.css';
import tutorialVideo from '../../../assets/ScienceDMA_Tutorial.mp4'

export default function HomePage() {

    return (
        
        <div className="home-layout">
            <h1> Welcome to ScienceDMA! </h1>
            <h4> ScienceDMA is a tool that allows users to compare 
                the physical characteristics of plastic materials to aid in design of the manufacturing process. </h4>

            <p> Check out the video below to see how it works!</p>
            <div>
            <video width="500" controls>
                <source src={tutorialVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}