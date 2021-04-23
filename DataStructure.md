Event : Developers.Institute Hackaton April 2021
Class : Developers.Institute Full Stack Web Python
Slack : #web-py18-ft-q2-2021
Project name : TheGenealogyApp
Project team : The Definitive Team

Terminology
===========
tree is a structure representing a familly
node is an individual anywhere in the tree
root is an individual without parent
leaf is an individual without child (biological or adopted)
relationship connects two nodes : filiation/adoption, wedding/companionship 

A node must be connected to at least one another node, through a relationship.

Description of a node
=====================
index
    integer
    Unique number allocated by the system at the creation of a node instance. Important to differentiate people with the same last and first names (although they can probably be distinguished with their birth date). This item is internal to the system and should not be displayed in the User Interface.
    Should be sequential and never re-used (if a node has been deleted, for example).

familyName
    string alphabetical (latin alphabet? what about accents)

familyNameVariants 
    array of strings
    Different spellings, different alphabets, other names used by the person

firstName
    string alphabetical (latin alphabet? what about accents)

firstNameVariants
    array of strings
    Middle name, different spellings, different alphabets, other firstnames used by the person

gender
    M F

birthDate
    date (yyyy-mm-dd)
birthCity
    string
    Not necessarily a currently existing city !
birthCountry
    string
birthContinent
    (pre-defined values)

deathDate
    date (yyyy-mm-dd)
birthCity
    string
    Not necessarily a currently existing city !
birthCountry
birthContinent
    (pre-defined values)

eventType
    (pre-defined values + free text?)
    E.g. wedding
eventDate
    date (yyyy-mm-dd)
eventPlace

profileImage
    image

freeText
    string
    Any other info


