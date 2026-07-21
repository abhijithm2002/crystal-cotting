import { Modal } from '@heroui/react'
import { X } from 'lucide-react'
import { useLead } from '../../hooks/useLead'
import { LeadForm } from '../forms/LeadForm'

export function QuoteModal() {
  const { quoteModal } = useLead()

  return (
    <Modal state={quoteModal}>
      <Modal.Backdrop className="fixed inset-0 z-[120] bg-charcoal/78 p-4 backdrop-blur-xl">
        <Modal.Container
          size="2xl"
          placement="center"
          scroll="inside"
          className="mx-auto flex min-h-full max-w-3xl items-center justify-center"
        >
          <Modal.Dialog className="relative max-h-[92svh] w-full overflow-auto rounded-[1.7rem] border border-white/70 bg-white shadow-premium">
            <Modal.CloseTrigger className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-mist bg-white text-charcoal shadow-sm">
              <X size={20} aria-hidden="true" />
            </Modal.CloseTrigger>
            <Modal.Header className="border-b border-mist bg-gradient-to-br from-royal-100 to-white p-7 pr-16">
              <Modal.Heading className="text-2xl font-black text-charcoal">
                Request a Free Painting Quote
              </Modal.Heading>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Share your project details and Crystal Coat will respond with the next steps for
                your painting or renovation requirement.
              </p>
            </Modal.Header>
            <Modal.Body className="p-5 sm:p-7">
              <LeadForm compact onSuccess={quoteModal.close} />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
