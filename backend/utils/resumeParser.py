import spacy
import os
from spacy.matcher import Matcher
from typing import Dict, Optional
import utils

class ResumeParser:
    def __init__(self, resume_path: str, skills_file: Optional[str] = None, custom_model_path: Optional[str] = None):
        self.resume_path = resume_path
        self.skills_file = skills_file
        self.custom_model_path = custom_model_path

        # Load spaCy models
        self.nlp = spacy.load('en_core_web_sm')
        self.custom_nlp = spacy.load(custom_model_path) if custom_model_path else None
        self.matcher = Matcher(self.nlp.vocab)
        self.details = {
            'name': None,
            'email': None,
            'mobile_number': None,
            'skills': None,
            'degree': None,
            'no_of_pages': None,
            'score': None,
            'strengths': [],
            'weaknesses': [],
            'suggestions': []
        }
        self.text = self.extract_text_from_resume()
        self.nlp_doc = self.nlp(self.text)
        self.custom_nlp_doc = self.custom_nlp(self.text) if self.custom_nlp else None
        self.process_resume()

    def extract_text_from_resume(self) -> str:
        """Extracts text from the resume file."""
        if not os.path.exists(self.resume_path):
            raise FileNotFoundError(f"Resume file not found: {self.resume_path}")
        # Use utils to extract text based on file extension
        ext = os.path.splitext(self.resume_path)[1].lower()
        return utils.extract_text(self.resume_path, ext)

    def process_resume(self):
        """Processes the resume and extracts details."""
        cust_ent = utils.extract_entities_with_custom_model(self.custom_nlp_doc) if self.custom_nlp else {}
        name = utils.extract_name(self.nlp_doc, matcher=self.matcher)
        email = utils.extract_email(self.text)
        mobile = utils.extract_mobile_number(self.text)
        skills = utils.extract_skills(self.nlp_doc, self.skills_file)
        degree = cust_ent.get('Degree', None)
        self.details.update({
            'name': name or cust_ent.get('Name', [None])[0],
            'email': email,
            'mobile_number': mobile,
            'skills': skills,
            'degree': degree,
            'no_of_pages': utils.get_number_of_pages(self.resume_path),
            'score': self.calculate_score()
        })
        self.details['strengths'], self.details['weaknesses'], self.details['suggestions'] = self.generate_feedback()

    def calculate_score(self) -> int:
        """Calculates a score for the resume (Placeholder logic)."""
        # Example placeholder score calculation
        return 80

    def generate_feedback(self) -> (list, list, list):
        """Generates feedback about strengths, weaknesses, and suggestions."""
        # Example placeholder feedback
        strengths = ['Strong communication skills', 'Relevant work experience']
        weaknesses = ['Lack of specific technical skills']
        suggestions = ['Add more details about projects', 'Highlight achievements more prominently']
        return strengths, weaknesses, suggestions

    def get_extracted_data(self) -> Dict[str, any]:
        """Returns the extracted data."""
        return self.details

# Example utility function calls and their stubs (to be implemented in utils.py)
def extract_text(file_path: str, file_extension: str) -> str:
    """Extracts text from a file based on its extension."""
    # Implement text extraction logic
    return "Extracted text"

def extract_entities_with_custom_model(doc) -> Dict[str, any]:
    """Extracts entities using a custom spaCy model."""
    # Implement custom entity extraction logic
    return {}

def extract_name(doc, matcher) -> Optional[str]:
    """Extracts name from the document."""
    # Implement name extraction logic
    return "John Doe"

def extract_email(text: str) -> Optional[str]:
    """Extracts email address from the text."""
    # Implement email extraction logic
    return "example@example.com"

def extract_mobile_number(text: str) -> Optional[str]:
    """Extracts mobile number from the text."""
    # Implement mobile number extraction logic
    return "123-456-7890"

def extract_skills(doc, skills_file: Optional[str]) -> list:
    """Extracts skills from the document."""
    # Implement skills extraction logic
    return ["Python", "JavaScript"]

def get_number_of_pages(file_path: str) -> int:
    """Returns the number of pages in the resume."""
    # Implement page count logic
    return 1
