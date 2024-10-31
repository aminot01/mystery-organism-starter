// bases used in DNA strand
const dnaBases = ['A', 'T', 'C', 'G'];

// Returns a random DNA base
const returnRandBase = () => {
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// keeps track of ID's used for organisms as they can not be repeated
let organismIDs = [];

// factory function for organisms
function pAequorFactory(organismID, bases) {
  // verify ID is unique
  if (organismIDs.includes(organismID)) {
    console.log("Two organisms can not have the same ID");
    return;
  }
  // create organism object with given values
  else {
    organismIDs.push(organismID);
    return {specimenNum: organismID, 
      dna: bases,
      // function changes random DNA base to a different base
      // commented lines were used for testing and verification
      mutate() {
        let baseNum = Math.floor(Math.random() * 15);
        let baseVal = this.dna[baseNum];
        //console.log(`Old dna: ${this.dna}`);
        //console.log(`base num: ${baseNum}, base val: ${baseVal}`);
        let otherBases = dnaBases.filter((base) => base !== baseVal);
        //console.log(`other bases: ${otherBases}`);
        let newVal = otherBases[Math.floor(Math.random() * 3)];
        //console.log(`new val: ${newVal}`);
        this.dna[baseNum] = newVal;
        //console.log(`new dna: ${this.dna}`);
        return this.dna;
      },
      // compares the percent of DNA two specimen share
      compareDNA(otherSpecimen) {
        let basesInCommon = 0;
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === otherSpecimen.dna[i]) {
            basesInCommon += 1;
          }
        }
        let percentInCommon = 100 * basesInCommon/this.dna.length;
        console.log(`Specimen ${this.specimenNum} and specimen ${otherSpecimen.specimenNum} have ${percentInCommon}% DNA in common`);
      },
      // calculates if DNA is made up of at least 60% C and G bases
      willLikelySurvive() {
        let numDesiredBases = 0;
        for (let base of this.dna) {
          if (base === "C" || base === "G") {
            numDesiredBases += 1;
          }
        }
        if (100 * numDesiredBases / this.dna.length >= 60) {
          return true;
        }
        else {
          return false;
        }
      }
    };
  }
}

let organisms = [];
let organismNum = 0;
while (organisms.length < 30) {
  let currentOrganism = pAequorFactory(organismNum, mockUpStrand());
  if (currentOrganism.willLikelySurvive()) {
    organisms.push(currentOrganism);
  }
  organismNum += 1;
};



