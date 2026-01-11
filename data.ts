
import { CourseData, Question } from './types';

export const INITIAL_SUMMARY = [
  {
    title: "I. Introduction & Définitions",
    content: "Le droit du numérique est une branche hybride encadrant les problématiques liées aux nouvelles technologies. Le terme 'numérique' renvoie à la représentation d'informations par des valeurs discrètes (chiffres binaires), par opposition à l'analogique (signaux continus). Le 'Droit' se divise en deux acceptions : Objective (règles de société) et Subjective (prérogatives individuelles)."
  },
  {
    title: "II. Fondements des Droits Subjectifs & Contrats",
    content: "Un acte juridique est une manifestation de volonté destinée à produire des effets de droit (ex: vente). Un fait juridique produit des effets de droit indépendamment de la volonté (ex: accident). Le contrat (Art 1101 Code Civil) exige 4 conditions de validité : le consentement non vicié, la capacité juridique, un objet certain et une cause licite. Le non-respect entraîne la nullité rétroactive."
  },
  {
    title: "III. Protection de la Vie Privée & Données Personnelles",
    content: "La donnée personnelle est toute information identifiant directement ou indirectement une personne (IP, photo, nom). L'Europe dispose du RGPD (2018). L'Afrique s'appuie sur la Convention de Malabo (2014). Le Cameroun a adopté une loi spécifique en décembre 2024. Les principes clés : licéité, finalité, exactitude, transparence, sécurité. Les droits : accès, rectification, opposition, portabilité, oubli."
  },
  {
    title: "IV. Droit d'Auteur & Propriété Intellectuelle",
    content: "Le droit d'auteur protège les œuvres originales de l'esprit (littéraires, artistiques, logicielles). Critère unique : l'originalité (empreinte de la personnalité). Il comprend des droits moraux (perpétuels, inaliénables : paternité, intégrité) et des droits patrimoniaux (économiques : reproduction, représentation, valables 50 ans après décès au Cameroun). Les droits voisins protègent les auxiliaires (artistes-interprètes, producteurs)."
  },
  {
    title: "V. Les Contrats du Numérique",
    content: "On distingue les contrats informatiques (Licence d'utilisation/exploitation, Maintenance, Infogérance, Aide à la décision) et les contrats liés au réseau (Fourniture d'accès - FAI, Hébergement web, Création de site, Réservation de nom de domaine, Référencement/SEO)."
  }
];

export const INITIAL_QCM: Question[] = [
  { id: 0, text: "Quelle est la 'summa divisio' du droit ?", options: ["Public / Privé", "Interne / Externe", "Civil / Pénal"], correctAnswer: 0, explanation: "C'est la distinction fondamentale entre les règles régissant l'État et celles régissant les particuliers." },
  { id: 1, text: "Que signifie une technologie 'analogique' ?", options: ["Signaux continus", "Valeurs discrètes", "Calcul binaire"], correctAnswer: 0, explanation: "L'analogique repose sur la variation continue d'une grandeur physique." },
  { id: 2, text: "Quel article définit le contrat ?", options: ["Art 1101", "Art 1382", "Art 1134"], correctAnswer: 0, explanation: "L'article 1101 du Code Civil définit le contrat comme une convention par laquelle une ou plusieurs personnes s'obligent." },
  { id: 3, text: "Quelle condition de validité n'est PAS citée à l'Art 1108 ?", options: ["La nationalité", "Le consentement", "L'objet certain"], correctAnswer: 0 },
  { id: 4, text: "Le droit moral est-il cessible ?", options: ["Non, il est inaliénable", "Oui, par contrat", "Seulement aux héritiers"], correctAnswer: 0 },
  { id: 5, text: "Quelle est la durée de protection patrimoniale au Cameroun ?", options: ["50 ans après décès", "70 ans après décès", "A vie"], correctAnswer: 0 },
  { id: 6, text: "Le RGPD est un texte de quel niveau ?", options: ["Européen", "Africain", "Camerounais"], correctAnswer: 0 },
  { id: 7, text: "Qu'est-ce qu'une donnée sensible ?", options: ["Religion, santé, opinions", "Nom et prénom", "Adresse IP"], correctAnswer: 0 },
  { id: 8, text: "Qui régule les télécoms au Cameroun ?", options: ["ART", "ANTIC", "MINPOSTEL"], correctAnswer: 0 },
  { id: 9, text: "Quelle agence gère la cybersécurité au Cameroun ?", options: ["ANTIC", "ART", "DGSN"], correctAnswer: 0 },
  { id: 10, text: "Le droit au déréférencement est aussi appelé...", options: ["Droit à l'oubli", "Droit d'accès", "Droit de retrait"], correctAnswer: 0 },
  { id: 11, text: "L'originalité est un critère...", options: ["Subjectif", "Quantitatif", "Administratif"], correctAnswer: 0 },
  { id: 12, text: "Un acte conservatoire vise à...", options: ["Préserver un bien", "Vendre un bien", "Gérer un bien"], correctAnswer: 0 },
  { id: 13, text: "Le contrat de licence d'utilisation transfère-t-il la propriété ?", options: ["Non, juste l'accès", "Oui, totalement", "Seulement le code source"], correctAnswer: 0 },
  { id: 14, text: "Qu'est-ce que le 'Privacy by design' ?", options: ["Protection dès la conception", "Protection par défaut", "Cryptage obligatoire"], correctAnswer: 0 },
  { id: 15, text: "La convention de Malabo traite de...", options: ["Cybersécurité et données", "Commerce maritime", "Droit de la famille"], correctAnswer: 0 },
  { id: 16, text: "Un élément d'extranéité implique...", options: ["Plusieurs pays", "Une seule personne", "Un juge unique"], correctAnswer: 0 },
  { id: 17, text: "Le droit d'auteur naît...", options: ["Dès la création", "Dès le dépôt", "Dès la vente"], correctAnswer: 0 },
  { id: 18, text: "Une œuvre composite...", options: ["Intègre une œuvre existante", "Est créée par un seul auteur", "Est anonyme"], correctAnswer: 0 },
  { id: 19, text: "Les droits voisins concernent...", options: ["Les artistes-interprètes", "Les auteurs de romans", "Les juges"], correctAnswer: 0 },
  { id: 20, text: "Le contrat d'infogérance consiste à...", options: ["Externaliser le SI", "Réparer un ordinateur", "Vendre du matériel"], correctAnswer: 0 },
  { id: 21, text: "Un nom de domaine est...", options: ["Une adresse textuelle unique", "Un mot de passe", "Un protocole IP"], correctAnswer: 0 },
  { id: 22, text: "Le référencement naturel est aussi appelé...", options: ["SEO", "SEM", "SaaS"], correctAnswer: 0 },
  { id: 23, text: "L'abus de droit subjectif est limité par...", options: ["L'ordre public", "La volonté pure", "Le prix"], correctAnswer: 0 },
  { id: 24, text: "La nullité relative sanctionne...", options: ["Un vice du consentement", "Un objet illicite", "L'absence de cause"], correctAnswer: 0 },
  { id: 25, text: "Le consentement doit être...", options: ["Libre et éclairé", "Tacite et secret", "Forcé"], correctAnswer: 0 },
  { id: 26, text: "Un contrat unilatéral...", options: ["Engage une seule partie", "Engage deux parties", "Est gratuit"], correctAnswer: 0 },
  { id: 27, text: "Le droit du numérique est une discipline...", options: ["Hybride", "Purement privée", "Purement publique"], correctAnswer: 0 },
  { id: 28, text: "Le droit de suite concerne...", options: ["Les reventes successives", "Le droit de retrait", "La paternité"], correctAnswer: 0 },
  { id: 29, text: "L'ANTIC gère l'extension...", options: [".cm", ".com", ".net"], correctAnswer: 0 }
];

export const INITIAL_COURSE_QUESTIONS: Question[] = [
  { id: 0, text: "Distinguez droit objectif et droits subjectifs.", correctAnswer: "Le droit objectif est l'ensemble des règles de conduite qui régissent les rapports entre les hommes dans la société (ex: Code Civil). Les droits subjectifs sont les prérogatives ou facultés que le droit objectif reconnaît à un individu ou à un groupe d'individus et dont ils peuvent se prévaloir dans leurs rapports avec les autres (ex: droit de propriété)." },
  { id: 1, text: "Expliquez la différence entre un acte et un fait juridique.", correctAnswer: "L'acte juridique est une manifestation de volonté destinée à produire des effets de droit (ex: signer un contrat). Le fait juridique est un événement indépendant de la volonté qui produit des effets de droit non recherchés (ex: un accident qui crée une obligation de réparation)." },
  { id: 2, text: "Quelles sont les quatre conditions de validité d'un contrat selon l'Art 1108 ?", correctAnswer: "1. Le consentement de la partie qui s'oblige ; 2. Sa capacité de contracter ; 3. Un objet certain qui forme la matière de l'engagement ; 4. Une cause licite dans l'obligation." },
  { id: 3, text: "Qu'est-ce qu'une donnée à caractère personnel selon le RGPD ?", correctAnswer: "C'est toute information relative à une personne physique identifiée ou identifiable (nom, IP, photo, ADN, etc.)." },
  { id: 4, text: "Expliquez le principe de 'Privacy by design'.", correctAnswer: "C'est l'obligation d'intégrer la protection des données personnelles dès la phase de conception d'un produit ou d'un service, et non comme une couche ajoutée a posteriori." },
  { id: 5, text: "Quel est le rôle de l'ART au Cameroun ?", correctAnswer: "L'Agence de Régulation des Télécommunications assure la régulation, le contrôle et le suivi des activités des exploitants et des opérateurs du secteur des télécommunications." },
  { id: 6, text: "Quelles sont les missions de l'ANTIC ?", correctAnswer: "L'Agence Nationale des Technologies de l'Information et de la Communication assure la promotion des TIC, la régulation de la cybersécurité et la gestion de l'extension .cm." },
  { id: 7, text: "Définissez l'originalité en droit d'auteur.", correctAnswer: "C'est l'empreinte de la personnalité de l'auteur sur son œuvre. Ce n'est pas la nouveauté, mais la marque de sa créativité propre." },
  { id: 8, text: "Qu'est-ce que le droit moral de l'auteur ?", correctAnswer: "C'est un droit extra-patrimonial, perpétuel, inaliénable et imprescriptible qui comprend le droit de paternité, le droit au respect de l'intégrité de l'œuvre, le droit de divulgation et le droit de retrait." },
  { id: 9, text: "Quelle est la différence entre une licence d'utilisation et une licence d'exploitation ?", correctAnswer: "La licence d'utilisation permet seulement de se servir du logiciel (usage interne). La licence d'exploitation autorise à commercialiser ou sous-licencier le logiciel." },
  { id: 10, text: "En quoi consiste un contrat d'infogérance ?", correctAnswer: "C'est l'externalisation de tout ou partie de la gestion du système d'information d'une entreprise à un prestataire tiers (SSII)." },
  { id: 11, text: "Qu'est-ce qu'un nom de domaine et qui le gère au Cameroun ?", correctAnswer: "C'est l'adresse textuelle permettant d'identifier un site web (ex: ensp.cm). Au Cameroun, il est géré par l'ANTIC." },
  { id: 12, text: "Expliquez la notion de 'droit au déréférencement'.", correctAnswer: "C'est le droit de demander à un moteur de recherche de supprimer certains liens associés à son nom s'ils sont inadéquats, non pertinents ou excessifs." },
  { id: 13, text: "Quels sont les trois types d'œuvres selon le nombre d'auteurs ?", correctAnswer: "L'œuvre de collaboration (plusieurs auteurs travaillant ensemble), l'œuvre composite (nouvelle œuvre intégrant une œuvre préexistante) et l'œuvre collective (sous la direction d'une personne qui l'édite)." },
  { id: 14, text: "Quelles sont les sanctions en cas de non-respect du RGPD ?", correctAnswer: "Des avant-premières administratives pouvant s'élever jusqu'à 20 millions d'euros ou 4% du chiffre d'affaires mondial annuel de l'entreprise." }
];

// Added missing required properties to INITIAL_DATA to satisfy CourseData interface
export const INITIAL_DATA: CourseData = {
  id: 'initial-course',
  disciplineId: 'disc-law',
  title: 'Droit Numérique Fondamental',
  examType: 'Standard',
  summary: INITIAL_SUMMARY,
  qcm: INITIAL_QCM,
  courseQuestions: INITIAL_COURSE_QUESTIONS,
  examQcm: INITIAL_QCM.slice(0, 4),
  examCourse: INITIAL_COURSE_QUESTIONS.slice(0, 2),
  situationProbleme: {
    scenario: "La startup 'Yaoundé-Tech' lance une application mobile de santé 'SantePlus'. Elle collecte des données sur le rythme cardiaque des utilisateurs, utilise un logo créé par un stagiaire, et héberge ses données chez un prestataire en France. Elle signe aussi un contrat de maintenance avec une société locale.",
    questions: [
      "L'application collecte des données de santé. Sont-elles des données sensibles ?",
      "Quel texte camerounais encadre désormais cette collecte ?",
      "Le stagiaire a créé le logo. Qui détient initialement les droits d'auteur ?",
      "Yaoundé-Tech doit-elle informer les utilisateurs de la finalité du traitement ?",
      "L'hébergement est en France. Quel texte européen s'applique au prestataire ?",
      "Si un utilisateur demande la suppression de ses données, quel droit exerce-t-il ?",
      "Le contrat de maintenance prévoit des délais d'intervention. Quel type d'obligation est-ce ?",
      "Yaoundé-Tech veut enregistrer 'santeplus.cm'. Quelle agence doit-elle contacter ?",
      "Le stagiaire peut-il s'opposer à une modification dénaturant son logo ? Pourquoi ?",
      "Si Yaoundé-Tech ne sécurise pas les données, quelle autorité peut la sanctionner au Cameroun ?",
      "Le contrat avec l'hébergeur est-il un contrat de service ?",
      "Que se passe-t-1 si le consentement des utilisateurs a été obtenu par tromperie ?",
      "La durée de protection du logo sera de combien de temps après le décès du stagiaire ?",
      "Yaoundé-Tech peut-elle utiliser les données pour une autre finalité sans nouvel accord ?"
    ],
    answers: [
      "Oui, les données de santé sont classées comme sensibles par nature.",
      "La loi de décembre 2024 sur la protection des données à caractère personnel.",
      "Le stagiaire, auteur de l'œuvre originale (principe de la création).",
      "Oui, au titre du principe de transparence et d'information préalable.",
      "Le RGPD (Règlement Général sur la Protection des Données).",
      "Le droit à l'effacement ou droit à l'oubli.",
      "Une obligation de résultat (ou de moyens renforcée selon le contrat).",
      "L'ANTIC.",
      "Oui, au nom du droit moral au respect de l'intégrité de l'œuvre.",
      "L'ANTIC ou l'ART selon le secteur, ou la justice camerounaise.",
      "Oui, plus précisément un contrat d'hébergement (prestation de services informatiques).",
      "Le contrat est nul pour vice du consentement (dol).",
      "50 ans après son décès.",
      "Non, le principe de finalité interdit l'usage détourné sans consentement."
    ]
  }
};
