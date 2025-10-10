import React, { useState } from "react";
import { Container, ProgressBar, Button } from "react-bootstrap";
import AboutForm from "../components/Account/AboutForm";
import AccountForm from "../components/Account/AccountForm";
import AddressForm from "../components/Account/AddressForm";

export default function AccountPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Container className="mt-4 mb-5">
      <h3 className="text-center mb-3">🧭 Build Your Profile</h3>
      <ProgressBar now={step * 33.3} label={`${step * 33.3}%`} className="mb-4" />
      {step === 1 && <AboutForm />}
      {step === 2 && <AccountForm />}
      {step === 3 && <AddressForm />}

      <div className="d-flex justify-content-between mt-3">
        <Button variant="secondary" onClick={prevStep} disabled={step === 1}>
          Previous
        </Button>
        {step < 3 ? (
          <Button variant="primary" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button variant="success">Finish</Button>
        )}
      </div>
    </Container>
  );
}
