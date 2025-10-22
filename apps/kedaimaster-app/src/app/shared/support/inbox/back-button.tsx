'use client';

import { useNavigate } from 'react-router-dom';
import { PiArrowLeft } from 'react-icons/pi';
import { Button } from 'rizzui';

export default function BackButton() {
  const router = useNavigate();
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => router.back()}
      className="flex items-center gap-2"
    >
      <PiArrowLeft />
      Back
    </Button>
  );
}
