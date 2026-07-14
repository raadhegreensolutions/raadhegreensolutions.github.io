/**
 * Brand logo mark — full artwork already includes company name.
 */
export function BrandLogo({
  className = 'h-11 w-auto sm:h-12',
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo.jpg`}
      alt="Raadhe Green Solutions Pvt. Ltd."
      className={className}
      width={1024}
      height={1024}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      draggable={false}
    />
  )
}
