import { useState } from "react";

function FAQ() {
  const [open, setOpen] = useState(null);

  const data = [
    {
      question: "How do I book a house?",
      answer: "You can contact the owner directly through the platform."
    },
    {
      question: "Is HomeLink free?",
      answer: "Yes, searching for properties is completely free."
    },
    {
      question: "Can I list my property?",
      answer: "Yes, you can add your property after creating an account."
    }
  ];

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">FAQs</h2>

      {data.map((item, index) => (
        <div key={index} className="mb-4 border rounded-lg p-4">
          <div
            className="cursor-pointer font-semibold"
            onClick={() => setOpen(open === index ? null : index)}
          >
            {item.question}
          </div>

          {open === index && (
            <p className="text-gray-600 mt-2">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQ;