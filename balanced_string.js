/*  string is called balanced when every letter occurring in the string appears both in upper and lowercase.
		in other words:
		for every letter of any case,
				the string must contain the letter in the opposite case at least once.

		given any string "str_1", find the shortest substring of "str_1" that is a balanced string.

		Let's use the string: 'azABabazabAB'
*/

const solution = (string) => {
	const letters = string.split('')
	const invalidLetters = findInvalidLetters(letters)
	const stringOfAllInvalidLetters = invalidLetters.join('')
	const splitRegex = new RegExp(`[${stringOfAllInvalidLetters}]`, 'gi')
	const substringArray = string.split(splitRegex)
	return findShortestBalancedFragment(substringArray)
}

const findShortestBalancedFragment = (substringArray) => {
	let shortest = null
	substringArray.forEach(substring => {
		if (checkBalancedString(substring.split(''))) {
			if (shortest) {
				if (substring.length < shortest.length)
					shortest = substring
			} else {
				shortest = substring
			}
		}
	})
	return [shortest, shortest.length]
}

const checkBalancedString = (letters) => {
	const isBalanced = letters.every(letter => {
		return oppositeCasePresent(letters, letter)
	})
	return isBalanced
}

const findInvalidLetters = (letters) => {
	const removeDuplicates = (letters) => {
		return letters.filter((letter, index, self) => {
			return self.indexOf(letter) == index
		})
	}

	let invalidLetters = []
	letters.forEach(letter => {
		if (!oppositeCasePresent(letters, letter))
			invalidLetters.push(letter)
	})

	return removeDuplicates(invalidLetters)
}

const oppositeCasePresent = (letterArray, letter) => {
	if (letter === letter.toUpperCase())
		return findLowerCase(letterArray, letter)
	else if (letter === letter.toLowerCase())
		return findUpperCase(letterArray, letter)
	else throw 'Characters must be A-Z, a-z'
}

const findLowerCase = (letterArray, letter) => {
	return letterArray.includes(letter.toLowerCase())

}
const findUpperCase = (letterArray, letter) => {
	return letterArray.includes(letter.toUpperCase())
}

// test
let string = 'azABabazabAB'
console.log(solution(string))