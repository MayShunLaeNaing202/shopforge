// src/pages/HomePage.tsx
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";
import StarRating from "../components/ui/StarRating";

const HomePage = () => {
  return (
    <div className="p-10 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">UI Components Test</h1>

      {/* Buttons */}
      <div className="flex gap-3 flex-wrap">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="danger">Danger</Button>
        <Button isLoading>Loading...</Button>
      </div>

      {/* Badges */}
      <div className="flex gap-3 flex-wrap">
        <Badge label="Electronics" variant="blue" />
        <Badge label="In Stock" variant="green" />
        <Badge label="Sale" variant="yellow" />
        <Badge label="Sold Out" variant="red" />
      </div>

      {/* Input */}
      <div className="max-w-sm flex flex-col gap-3">
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" error="Password is required" />
      </div>

      {/* Star Rating */}
      <div className="flex flex-col gap-2">
        <StarRating rating={4.5} reviewCount={128} />
        <StarRating rating={3.0} reviewCount={45} size="md" />
      </div>
    </div>
  );
};

export default HomePage;
