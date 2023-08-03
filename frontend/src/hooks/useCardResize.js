import { useState, useEffect } from 'react'

// setting up number of cards on a page by page width
const useCardResize = (initialValues) => {
    const [cartoonsPerPage, setCartoonsPerPage] = useState(initialValues)

    useEffect(() => {
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    // Change number of cartoons in scroller depending on window width
    const handleResize = () => {
        let innerWidth = window.innerWidth;
        if (innerWidth > 1920)
        {
            setCartoonsPerPage(15);
        }
        else if (innerWidth > 1480)
        {
            setCartoonsPerPage(9);
        }
        else if (innerWidth > 1280)
        {
            setCartoonsPerPage(7);
        }
        else if (innerWidth > 1080)
        {
            setCartoonsPerPage(6);
        }
        else if (innerWidth > 720)
        {
            setCartoonsPerPage(5);
        }
        else if (innerWidth > 400)
        {
            setCartoonsPerPage(3);
        }
        else
        {
            setCartoonsPerPage(1);
        }
    }

  return { cartoonsPerPage }
} 

export default useCardResize