// Mockup i18n — embedded translations for 4 locales
// Locale read from URL param ?lang=xx, fallback to 'fr'

const translations = {
  fr: {
    // Topbar
    'topbar.userMenu': 'Menu utilisateur',
    'topbar.taskManager': 'Gestionnaire de tâches',
    'topbar.filters': 'Filtres',
    'topbar.generateAI': "Générer avec l'IA",
    'topbar.newCv': 'Nouveau CV',
    'topbar.importPdf': 'Importer PDF',
    'topbar.export': 'Exporter',
    'topbar.delete': 'Supprimer',
    'topbar.searchPlaceholder': 'Entrez un titre de poste...',

    // Step labels
    'step.1': 'Import PDF',
    'step.2': 'Génération IA',
    'step.3': 'Mode Review',
    'step.4': 'Score de correspondance',
    'step.5': 'Optimisation IA',
    'step.6': 'Review optimisation',
    'step.7': 'Export',

    // Step indicator
    'stepIndicator': 'Étape {n} — {label}',

    // Status
    'status.done': 'Terminé',

    // Task step labels
    'task.importPdf': 'Import PDF',
    'task.aiConversion': 'Conversion IA',
    'task.structuring': 'Structuration',
    'task.classification': 'Classification',
    'task.skills': 'Compétences',
    'task.summary': 'Résumé',
    'task.experiences': 'Expériences {done}/{total}',
    'task.projects': 'Projets {done}/{total}',

    // Counters
    'count.total': 'Total : {n}',

    // Generator modal
    'genModal.title': "Générer un CV avec l'IA",
    'genModal.refCv': 'CV de référence',
    'genModal.createNew': 'Créer un nouveau modèle de CV',
    'genModal.jobLinks': "Liens vers les offres d'emploi",
    'genModal.linkPlaceholder': "https://... (lien vers l'offre d'emploi)",
    'genModal.recentLinks': 'Liens récents',
    'genModal.addLink': 'Ajouter un lien',
    'genModal.pdfOffers': "Offres d'emploi PDF",
    'genModal.choosePdf': 'Choisir un fichier PDF',
    'genModal.cancel': 'Annuler',
    'genModal.validate': 'Valider',

    // Optimization modal
    'optimModal.title': 'Analyse et Optimisation',
    'optimModal.matchScore': 'Score de correspondance',
    'optimModal.scoreBreakdown': 'Détail du score',
    'optimModal.technicalSkills': 'Compétences techniques',
    'optimModal.experience': 'Expérience',
    'optimModal.education': 'Formation',
    'optimModal.softSkillsLangs': 'Soft skills & langues',
    'optimModal.suggestions': "Suggestions d'amélioration",
    'optimModal.high': 'Haute',
    'optimModal.medium': 'Moyenne',
    'optimModal.points': '+{n} points',
    'optimModal.missingSkills': 'Compétences manquantes',
    'optimModal.matchingSkills': 'Compétences correspondantes',
    'optimModal.moreOthers': '+{n} autres',
    'optimModal.improveCv': 'Améliorer le CV',
    'optimModal.close': 'Fermer',

    // Export modal
    'exportModal.title': 'Exporter le CV',
    'exportModal.filename': 'Nom du fichier',
    'exportModal.template': 'Template',
    'exportModal.save': 'Sauvegarder',
    'exportModal.reset': 'Réinitialiser',
    'exportModal.selectAll': 'Tout sélectionner',
    'exportModal.deselectAll': 'Tout désélectionner',
    'exportModal.sections': 'Sections',
    'exportModal.dragHint': '— Glisser pour réordonner',
    'exportModal.alwaysIncluded': 'Toujours inclus',
    'exportModal.cancel': 'Annuler',
    'exportModal.preview': 'Prévisualiser',
    'exportModal.previewTitle': 'Prévisualisation PDF',
    'exportModal.pageBreak': 'Saut de page',
    'exportModal.backToOptions': 'Retour aux options',
    'exportModal.export': 'Exporter',

    // Import modal
    'importModal.title': 'Importer un CV PDF',
    'importModal.desc': "Importez un CV au format PDF pour le convertir automatiquement en utilisant l'intelligence artificielle.",
    'importModal.fileLabel': 'FICHIER PDF',
    'importModal.choosePdf': 'Choisir un fichier PDF',
    'importModal.fileSelected': 'Fichier sélectionné :',
    'importModal.cancel': 'Annuler',
    'importModal.import': 'Importer',

    // Review UI
    'review.acceptAll': 'Tout accepter',
    'review.rejectAll': 'Tout refuser',
    'review.accept': 'Accepter',
    'review.reject': 'Rejeter',
    'review.previousText': 'Texte précédent :',
    'review.reason': 'Raison : ',
  },

  en: {
    'topbar.userMenu': 'User menu',
    'topbar.taskManager': 'Task manager',
    'topbar.filters': 'Filters',
    'topbar.generateAI': 'Generate with AI',
    'topbar.newCv': 'New resume',
    'topbar.importPdf': 'Import PDF',
    'topbar.export': 'Export',
    'topbar.delete': 'Delete',
    'topbar.searchPlaceholder': 'Enter a job title...',

    'step.1': 'PDF Import',
    'step.2': 'AI Generation',
    'step.3': 'Review Mode',
    'step.4': 'Match Score',
    'step.5': 'AI Optimization',
    'step.6': 'Optimization Review',
    'step.7': 'Export',

    'stepIndicator': 'Step {n} — {label}',

    'status.done': 'Done',

    'task.importPdf': 'PDF Import',
    'task.aiConversion': 'AI Conversion',
    'task.structuring': 'Structuring',
    'task.classification': 'Classification',
    'task.skills': 'Skills',
    'task.summary': 'Summary',
    'task.experiences': 'Experience {done}/{total}',
    'task.projects': 'Projects {done}/{total}',

    'count.total': 'Total: {n}',

    'genModal.title': 'Generate a resume with AI',
    'genModal.refCv': 'Source resume',
    'genModal.createNew': 'Create a new resume template',
    'genModal.jobLinks': 'Job posting links',
    'genModal.linkPlaceholder': 'https://... (link to job posting)',
    'genModal.recentLinks': 'Recent links',
    'genModal.addLink': 'Add a link',
    'genModal.pdfOffers': 'Job postings PDF',
    'genModal.choosePdf': 'Choose a PDF file',
    'genModal.cancel': 'Cancel',
    'genModal.validate': 'Submit',

    'optimModal.title': 'Analysis & Optimization',
    'optimModal.matchScore': 'Match score',
    'optimModal.scoreBreakdown': 'Score breakdown',
    'optimModal.technicalSkills': 'Technical skills',
    'optimModal.experience': 'Experience',
    'optimModal.education': 'Education',
    'optimModal.softSkillsLangs': 'Soft skills & languages',
    'optimModal.suggestions': 'Improvement suggestions',
    'optimModal.high': 'High',
    'optimModal.medium': 'Medium',
    'optimModal.points': '+{n} points',
    'optimModal.missingSkills': 'Missing skills',
    'optimModal.matchingSkills': 'Matching skills',
    'optimModal.moreOthers': '+{n} others',
    'optimModal.improveCv': 'Improve resume',
    'optimModal.close': 'Close',

    'exportModal.title': 'Export resume',
    'exportModal.filename': 'File name',
    'exportModal.template': 'Template',
    'exportModal.save': 'Save',
    'exportModal.reset': 'Reset',
    'exportModal.selectAll': 'Select all',
    'exportModal.deselectAll': 'Deselect all',
    'exportModal.sections': 'Sections',
    'exportModal.dragHint': '— Drag to reorder',
    'exportModal.alwaysIncluded': 'Always included',
    'exportModal.cancel': 'Cancel',
    'exportModal.preview': 'Preview',
    'exportModal.previewTitle': 'PDF Preview',
    'exportModal.pageBreak': 'Page break',
    'exportModal.backToOptions': 'Back to options',
    'exportModal.export': 'Export',

    'importModal.title': 'Import a PDF resume',
    'importModal.desc': 'Import a PDF resume to automatically convert it using artificial intelligence.',
    'importModal.fileLabel': 'PDF FILE',
    'importModal.choosePdf': 'Choose a PDF file',
    'importModal.fileSelected': 'File selected:',
    'importModal.cancel': 'Cancel',
    'importModal.import': 'Import',

    'review.acceptAll': 'Accept all',
    'review.rejectAll': 'Reject all',
    'review.accept': 'Accept',
    'review.reject': 'Reject',
    'review.previousText': 'Previous text:',
    'review.reason': 'Reason: ',
  },

  es: {
    'topbar.userMenu': 'Menú de usuario',
    'topbar.taskManager': 'Gestor de tareas',
    'topbar.filters': 'Filtros',
    'topbar.generateAI': 'Generar con IA',
    'topbar.newCv': 'Nuevo CV',
    'topbar.importPdf': 'Importar PDF',
    'topbar.export': 'Exportar',
    'topbar.delete': 'Eliminar',
    'topbar.searchPlaceholder': 'Introduce un puesto de trabajo...',

    'step.1': 'Importar PDF',
    'step.2': 'Generación IA',
    'step.3': 'Modo revisión',
    'step.4': 'Puntuación de compatibilidad',
    'step.5': 'Optimización IA',
    'step.6': 'Revisión de optimización',
    'step.7': 'Exportar',

    'stepIndicator': 'Paso {n} — {label}',

    'status.done': 'Completado',

    'task.importPdf': 'Importar PDF',
    'task.aiConversion': 'Conversión IA',
    'task.structuring': 'Estructuración',
    'task.classification': 'Clasificación',
    'task.skills': 'Competencias',
    'task.summary': 'Resumen',
    'task.experiences': 'Experiencias {done}/{total}',
    'task.projects': 'Proyectos {done}/{total}',

    'count.total': 'Total: {n}',

    'genModal.title': 'Generar un CV con IA',
    'genModal.refCv': 'CV de referencia',
    'genModal.createNew': 'Crear una nueva plantilla de CV',
    'genModal.jobLinks': 'Enlaces a ofertas de empleo',
    'genModal.linkPlaceholder': 'https://... (enlace a la oferta de empleo)',
    'genModal.recentLinks': 'Enlaces recientes',
    'genModal.addLink': 'Añadir un enlace',
    'genModal.pdfOffers': 'Ofertas de empleo PDF',
    'genModal.choosePdf': 'Elegir un archivo PDF',
    'genModal.cancel': 'Cancelar',
    'genModal.validate': 'Validar',

    'optimModal.title': 'Análisis y optimización',
    'optimModal.matchScore': 'Puntuación de compatibilidad',
    'optimModal.scoreBreakdown': 'Detalle de la puntuación',
    'optimModal.technicalSkills': 'Competencias técnicas',
    'optimModal.experience': 'Experiencia',
    'optimModal.education': 'Formación',
    'optimModal.softSkillsLangs': 'Soft skills e idiomas',
    'optimModal.suggestions': 'Sugerencias de mejora',
    'optimModal.high': 'Alta',
    'optimModal.medium': 'Media',
    'optimModal.points': '+{n} puntos',
    'optimModal.missingSkills': 'Competencias ausentes',
    'optimModal.matchingSkills': 'Competencias correspondientes',
    'optimModal.moreOthers': '+{n} más',
    'optimModal.improveCv': 'Mejorar el CV',
    'optimModal.close': 'Cerrar',

    'exportModal.title': 'Exportar el CV',
    'exportModal.filename': 'Nombre del archivo',
    'exportModal.template': 'Plantilla',
    'exportModal.save': 'Guardar',
    'exportModal.reset': 'Restablecer',
    'exportModal.selectAll': 'Seleccionar todo',
    'exportModal.deselectAll': 'Deseleccionar todo',
    'exportModal.sections': 'Secciones',
    'exportModal.dragHint': '— Arrastrar para reordenar',
    'exportModal.alwaysIncluded': 'Siempre incluido',
    'exportModal.cancel': 'Cancelar',
    'exportModal.preview': 'Vista previa',
    'exportModal.previewTitle': 'Vista previa del PDF',
    'exportModal.pageBreak': 'Salto de página',
    'exportModal.backToOptions': 'Volver a las opciones',
    'exportModal.export': 'Exportar',

    'importModal.title': 'Importar un CV en PDF',
    'importModal.desc': 'Importa un CV en formato PDF para convertirlo automáticamente utilizando inteligencia artificial.',
    'importModal.fileLabel': 'ARCHIVO PDF',
    'importModal.choosePdf': 'Elegir un archivo PDF',
    'importModal.fileSelected': 'Archivo seleccionado:',
    'importModal.cancel': 'Cancelar',
    'importModal.import': 'Importar',

    'review.acceptAll': 'Aceptar todo',
    'review.rejectAll': 'Rechazar todo',
    'review.accept': 'Aceptar',
    'review.reject': 'Rechazar',
    'review.previousText': 'Texto anterior:',
    'review.reason': 'Motivo: ',
  },

  de: {
    'topbar.userMenu': 'Benutzermenü',
    'topbar.taskManager': 'Aufgabenverwaltung',
    'topbar.filters': 'Filter',
    'topbar.generateAI': 'Mit KI generieren',
    'topbar.newCv': 'Neuer Lebenslauf',
    'topbar.importPdf': 'PDF importieren',
    'topbar.export': 'Exportieren',
    'topbar.delete': 'Löschen',
    'topbar.searchPlaceholder': 'Stellenbezeichnung eingeben...',

    'step.1': 'PDF-Import',
    'step.2': 'KI-Generierung',
    'step.3': 'Überprüfungsmodus',
    'step.4': 'Kompatibilitätsbewertung',
    'step.5': 'KI-Optimierung',
    'step.6': 'Optimierungsüberprüfung',
    'step.7': 'Export',

    'stepIndicator': 'Schritt {n} — {label}',

    'status.done': 'Abgeschlossen',

    'task.importPdf': 'PDF-Import',
    'task.aiConversion': 'KI-Konvertierung',
    'task.structuring': 'Strukturierung',
    'task.classification': 'Klassifizierung',
    'task.skills': 'Kompetenzen',
    'task.summary': 'Zusammenfassung',
    'task.experiences': 'Erfahrungen {done}/{total}',
    'task.projects': 'Projekte {done}/{total}',

    'count.total': 'Gesamt: {n}',

    'genModal.title': 'Lebenslauf mit KI generieren',
    'genModal.refCv': 'Referenz-Lebenslauf',
    'genModal.createNew': 'Neue Lebenslauf-Vorlage erstellen',
    'genModal.jobLinks': 'Links zu Stellenanzeigen',
    'genModal.linkPlaceholder': 'https://... (Link zur Stellenanzeige)',
    'genModal.recentLinks': 'Letzte Links',
    'genModal.addLink': 'Link hinzufügen',
    'genModal.pdfOffers': 'Stellenanzeigen PDF',
    'genModal.choosePdf': 'PDF-Datei auswählen',
    'genModal.cancel': 'Abbrechen',
    'genModal.validate': 'Bestätigen',

    'optimModal.title': 'Analyse und Optimierung',
    'optimModal.matchScore': 'Kompatibilitätsbewertung',
    'optimModal.scoreBreakdown': 'Bewertungsdetails',
    'optimModal.technicalSkills': 'Technische Kompetenzen',
    'optimModal.experience': 'Erfahrung',
    'optimModal.education': 'Ausbildung',
    'optimModal.softSkillsLangs': 'Soft Skills & Sprachen',
    'optimModal.suggestions': 'Verbesserungsvorschläge',
    'optimModal.high': 'Hoch',
    'optimModal.medium': 'Mittel',
    'optimModal.points': '+{n} Punkte',
    'optimModal.missingSkills': 'Fehlende Kompetenzen',
    'optimModal.matchingSkills': 'Übereinstimmende Kompetenzen',
    'optimModal.moreOthers': '+{n} weitere',
    'optimModal.improveCv': 'Lebenslauf verbessern',
    'optimModal.close': 'Schließen',

    'exportModal.title': 'Lebenslauf exportieren',
    'exportModal.filename': 'Dateiname',
    'exportModal.template': 'Vorlage',
    'exportModal.save': 'Speichern',
    'exportModal.reset': 'Zurücksetzen',
    'exportModal.selectAll': 'Alle auswählen',
    'exportModal.deselectAll': 'Alle abwählen',
    'exportModal.sections': 'Abschnitte',
    'exportModal.dragHint': '— Ziehen zum Neuordnen',
    'exportModal.alwaysIncluded': 'Immer enthalten',
    'exportModal.cancel': 'Abbrechen',
    'exportModal.preview': 'Vorschau',
    'exportModal.previewTitle': 'PDF-Vorschau',
    'exportModal.pageBreak': 'Seitenumbruch',
    'exportModal.backToOptions': 'Zurück zu den Optionen',
    'exportModal.export': 'Exportieren',

    'importModal.title': 'PDF-Lebenslauf importieren',
    'importModal.desc': 'Importieren Sie einen Lebenslauf im PDF-Format, um ihn automatisch mithilfe künstlicher Intelligenz zu konvertieren.',
    'importModal.fileLabel': 'PDF-DATEI',
    'importModal.choosePdf': 'PDF-Datei auswählen',
    'importModal.fileSelected': 'Datei ausgewählt:',
    'importModal.cancel': 'Abbrechen',
    'importModal.import': 'Importieren',

    'review.acceptAll': 'Alle akzeptieren',
    'review.rejectAll': 'Alle ablehnen',
    'review.accept': 'Akzeptieren',
    'review.reject': 'Ablehnen',
    'review.previousText': 'Vorheriger Text:',
    'review.reason': 'Grund: ',
  },
};

let currentLang = 'fr';

export function initLang() {
  const match = location.search.match(/[?&]lang=(\w+)/);
  if (match && translations[match[1]]) {
    currentLang = match[1];
  }
}

export function getLang() {
  return currentLang;
}

export function t(key, vars) {
  const str = (translations[currentLang] && translations[currentLang][key])
    || translations.fr[key]
    || key;
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] !== undefined ? vars[k] : `{${k}}`);
}
