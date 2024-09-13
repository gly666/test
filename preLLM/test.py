import re
import json

def parse_input(input_text):
    """解析输入数据"""
    question_answer_pairs = []
    pattern = r'(?:Now answer this question:|Question:|Q:|Please answer a question about the following headline:)\s*(.*?)(?:\s*Yes\s*|\s*No\s*)'
    matches = re.findall(pattern, input_text, re.DOTALL)
    answers = re.findall(r'(Yes|No)', input_text)
    if len(matches) == len(answers):
        for question, answer in zip(matches, answers):
            question_answer_pairs.append({
                "Question": question.strip(),
                "Answer": answer.strip()
            })
    return question_answer_pairs

def transform_dataset(dataset):
    """将数据集转换为所需的格式"""
    transformed_data = []
    
    for entry in dataset:
        input_text = entry['input']  
        question_answer_pairs = parse_input(input_text) 
        
        for i, pair in enumerate(question_answer_pairs):
            transformed_data.append({
                "id": f"{entry['id']}_{i}",  
                "Question": pair['Question'],
                "Answer": pair['Answer']
            })

    return transformed_data

with open("test.json",'r') as jsonfile:
    jsondata = json.load(jsonfile)
print(f"Total question-answer pairs: {len(jsondata)}")
transformed_data = transform_dataset(jsondata)
with open('transformed_data.json', 'w') as file:
    json.dump(transformed_data, file, indent=4)

print(f"Total question-answer pairs: {len(transformed_data)}")
