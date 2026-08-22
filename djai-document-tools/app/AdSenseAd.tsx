// Ad serving is intentionally paused while djai.academy completes publisher
// approval recovery. The compatibility component keeps template changes small.
type AdSenseAdProps = {
  label?: string;
  variant?: "display" | "display2" | "multiplex";
};

export default function AdSenseAd(props: AdSenseAdProps) {
  void props;
  return null;
}
