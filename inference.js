const rules = [
    { if: ["đau họng", "ho", "sốt"], then: "Viêm họng cấp" },
    { if: ["đau họng", "khó nuốt"], then: "Viêm amidan" },
    { if: ["ho khan", "đau ngực"], then: "Viêm phế quản" },
    { if: ["ho có đờm", "khó thở"], then: "Viêm phổi" },
    { if: ["đau họng", "mệt mỏi"], then: "Cảm cúm" },
    { if: ["Viêm họng cấp", "sốt cao"], then: "Viêm họng do vi khuẩn" },
    { if: ["Viêm amidan", "đau họng", "khó nuốt"], then: "Viêm amidan cấp tính" },
    { if: ["Cảm cúm", "đau đầu"], then: "Cảm lạnh thông thường" },
    { if: ["Viêm phế quản", "ho có đờm"], then: "Viêm phế quản mãn tính" },
    { if: ["Viêm phổi", "khó thở"], then: "Viêm phổi nặng" },
    { if: ["Viêm họng cấp", "khó nuốt", "sốt cao"], then: "Viêm họng nặng" },
    { if: ["Viêm phế quản", "mệt mỏi"], then: "Viêm phế quản cấp tính" },
    { if: ["ho khan", "khó thở"], then: "Nguy cơ viêm phổi" },
    { if: ["đau họng", "sốt"], then: "Nguy cơ viêm họng" },
    { if: ["sốt cao", "khó thở"], then: "Nguy cơ viêm phổi" }
];

// Hiển thị quy tắc trên giao diện
const rulesList = document.getElementById('rulesList');
rules.forEach(rule => {
    const listItem = document.createElement('li');
    listItem.className = "rulesList__item"
    const ruleIfContainer = document.createElement('div');
    ruleIfContainer.className = 'if';
    const ruleIfSpan = document.createElement('span');
    ruleIfSpan.textContent = 'If';
    const ruleIfItems = document.createElement('ul');
    ruleIfItems.className = 'if__item';

    rule.if.forEach(symptom => {
        const symptomSpan = document.createElement('li');
        symptomSpan.textContent = symptom;
        ruleIfItems.appendChild(symptomSpan);
    });

    const ruleThen = document.createElement('p');
    ruleThen.className = 'rule-then';
    ruleThen.textContent = `Then: ${rule.then}`;

    ruleIfContainer.appendChild(ruleIfSpan);
    ruleIfContainer.appendChild(ruleIfItems);
    listItem.appendChild(ruleIfContainer);
    listItem.appendChild(ruleThen);
    rulesList.appendChild(listItem);
});


document.getElementById('diagnose').addEventListener('click', () => {
    const input = document.getElementById('symptoms').value.toLowerCase();
    let symptoms = input.split(',').map(symptom => symptom.trim());
    let finalDiagnosis = "Không tìm thấy chẩn đoán.";
    let foundDiagnosis = true; // Biến để kiểm tra có tìm thấy chẩn đoán không
    // Lặp cho đến khi không tìm thấy luật nào phù hợp
    while (foundDiagnosis) {
        foundDiagnosis = false; // Mặc định là không tìm thấy
        // Kiểm tra các quy tắc
        for (const rule of rules) {
            const matches = rule.if.every(symptom => symptoms.includes(symptom));
            if (matches) {
                finalDiagnosis = rule.then; // Cập nhật chẩn đoán cuối
                // Xóa các triệu chứng đã sử dụng để tìm kiếm
                rule.if.forEach(symptom => {
                    symptoms = symptoms.filter(s => s !== symptom);
                });
                symptoms.push(rule.then); // Thêm chẩn đoán vào triệu chứng
                foundDiagnosis = true; // Đánh dấu là đã tìm thấy chẩn đoán
                break; // Dừng lại khi tìm thấy chẩn đoán
            }
        }
    }
    document.getElementById('result').innerText = finalDiagnosis;
});