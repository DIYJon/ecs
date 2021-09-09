function createMedalTable(medals) {
    // Parse the medal data to produce a medaltable
    // The winner gets 3 points, second place 2 points and third place 1 point
        
    
    winners = [] // Array to group together all people who win as event has no impact on score
    medals.forEach((event) => {
        event.podium.forEach((positionFinished)=> {
        winners.push(positionFinished)
        })
    });

    // Splits the positions finished into countries and positions in order to create a group for list of countries
    allWinners = [] 
    winners.forEach((positionCountry) => {
        a = positionCountry.split(".")
        allWinners.push(a[1])
    })
    
    // Removes copies on countries
    table = allWinners.filter(function(item, placeInList, list) {
        return list.indexOf(item) == placeInList;
    })
    
    // Assigns a value to all the countries ready to add there points
    score = []
    table.forEach((country) => {score[country] = 0})
    
    // Adds the points
    winners.forEach ((positionCountryScore) => {
        b = positionCountryScore.split(".")
        checkNumber = parseInt (b[0])
        checkNumber = 4 - checkNumber
        points = b[1]
        score[points] += checkNumber
            
    })

    return score;
}




describe("Medal Table Generator", () => {
    // Test function, please do not edit
    it("creates correct data structure ", () => {
        // Input data
        const medals = [{
                sport: "cycling",
                podium: ["1.China", "2.Germany", "3.ROC"]
            },
            {
                sport: "fencing",
                podium: ["1.ROC", "2.France", "3.Italy"]
            },
            {
                sport: "high jump",
                podium: ["1.Italy", "1.Qatar", "3.Belarus"]
            },
            {
                sport: "swimming",
                podium: ["1.USA", "2.France", "3.Brazil"]
            }
        ];

        // Expected output data
        const medalTable = {
            "Italy": 4,
            "France": 4,
            "ROC": 4,
            "USA": 3,
            "Qatar": 3,
            "China": 3,
            "Germany": 2,
            "Brazil": 1,
            "Belarus": 1,
        };

        const actualResult = createMedalTable(medals);
        expect(actualResult).toMatchObject(medalTable);
    });
});