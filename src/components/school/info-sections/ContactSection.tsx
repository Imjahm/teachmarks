interface ContactSectionProps {
  phone_number?: string
  email?: string
  website?: string
}

export const ContactSection = ({
  phone_number,
  email,
  website
}: ContactSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phone_number && (
          <div>
            <p className="font-medium">Phone:</p>
            <p className="text-muted-foreground">{phone_number}</p>
          </div>
        )}
        {email && (
          <div>
            <p className="font-medium">Email:</p>
            <p className="text-muted-foreground">{email}</p>
          </div>
        )}
        {website && (
          <div>
            <p className="font-medium">Website:</p>
            <a href={website} target="_blank" rel="noopener noreferrer" 
               className="text-primary hover:underline">
              Visit Website
            </a>
          </div>
        )}
      </div>
    </div>
  )
}