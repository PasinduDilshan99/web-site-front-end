import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font,
  Link
} from '@react-pdf/renderer';
import { ReceiptData, AccommodationDetail } from '@/types/booking-types';

// Register fonts (optional, for better typography)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 5,
    color: '#000000',
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 10,
    color: '#000000',
    borderBottom: '1pt solid #d8b4fe',
    paddingBottom: 5,
  },
  grid: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  gridColumn: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 2,
  },
  value: {
    fontSize: 11,
    fontWeight: 500,
    color: '#000000',
    marginBottom: 5,
  },
  statusBadge: {
    fontSize: 9,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 5,
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d8b4fe',
    marginBottom: 15,
  },
  tableHeader: {
    backgroundColor: '#f3e8ff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d8b4fe',
    borderBottomStyle: 'solid',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f3e8ff',
    borderBottomStyle: 'solid',
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
    color: '#000000',
  },
  tableCellHeader: {
    padding: 8,
    fontSize: 10,
    fontWeight: 700,
    color: '#000000',
  },
  totalRow: {
    backgroundColor: '#f3e8ff',
    fontWeight: 700,
  },
  highlightRow: {
    backgroundColor: '#e9d5ff',
    fontWeight: 700,
  },
  footer: {
    textAlign: 'center',
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#d8b4fe',
    borderTopStyle: 'solid',
    fontSize: 10,
    color: '#666666',
  },
  amount: {
    fontSize: 12,
    fontWeight: 700,
  },
  amountPositive: {
    color: '#10b981',
  },
  amountNegative: {
    color: '#ef4444',
  },
});

// Helper functions
const calculateAccommodationTotalPerPerson = (accommodations: AccommodationDetail[]): number => {
  let totalAmount = 0.0;
  for (const p of accommodations) {
    const priceWithServiceCharge = p.price * (100.0 + p.serviceCharge) / 100;
    const discount = priceWithServiceCharge * p.discount / 100;
    const tax = priceWithServiceCharge * p.tax / 100;
    const total = priceWithServiceCharge - discount + tax + p.extraCharge + p.transportPrice;
    totalAmount += total;
  }
  return totalAmount;
};

const calculateActivityTotalPerPerson = (activities: ReceiptData['activityDetailsList']): number => {
  let totalAmount = 0.0;
  for (const p of activities) {
    totalAmount += p.pricePerPerson;
  }
  return totalAmount;
};

const calculateDestinationExtraTotalPerPerson = (destinations: ReceiptData['destiantionDetails']): number => {
  let totalAmount = 0.0;
  for (const p of destinations) {
    totalAmount += p.extraPrice;
  }
  return totalAmount;
};

interface PDFReceiptProps {
  receiptData: ReceiptData;
}

const PDFReceipt: React.FC<PDFReceiptProps> = ({ receiptData }) => {
  const participantsCount = receiptData.participentDetails.length;
  
  const activitiesTotalPerPerson = calculateActivityTotalPerPerson(receiptData.activityDetailsList);
  const destinationsTotalPerPerson = calculateDestinationExtraTotalPerPerson(receiptData.destiantionDetails);
  const accommodationsTotalPerPerson = calculateAccommodationTotalPerPerson(receiptData.accommodationDetailsList);
  
  const activitiesTotal = activitiesTotalPerPerson * participantsCount;
  const destinationsTotal = destinationsTotalPerPerson * participantsCount;
  const accommodationsTotal = accommodationsTotalPerPerson * participantsCount;

  const calculatedSubtotal = activitiesTotal + destinationsTotal + accommodationsTotal + receiptData.packagePrice;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'CONFIRMED': return { backgroundColor: '#d1fae5', color: '#065f46' };
      default: return { backgroundColor: '#f3f4f6', color: '#374151' };
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>BOOKING CONFIRMATION</Text>
          <Text style={styles.subtitle}>Receipt for Booking #{receiptData.bookingReference}</Text>
        </View>

        {/* Booking Info */}
        <View style={styles.grid}>
          <View style={styles.gridColumn}>
            <Text style={styles.label}>Booking ID</Text>
            <Text style={styles.value}>{receiptData.bookingId}</Text>
            
            <Text style={styles.label}>Reference</Text>
            <Text style={styles.value}>{receiptData.bookingReference}</Text>
            
            <Text style={styles.label}>Invoice</Text>
            <Text style={styles.value}>{receiptData.invoiceNumber}</Text>
            
            <Text style={styles.label}>Status</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.value}>{receiptData.bookingStatus}</Text>
              <View style={{
                ...styles.statusBadge,
                backgroundColor: getStatusColor(receiptData.bookingStatus).backgroundColor,
                color: getStatusColor(receiptData.bookingStatus).color,
              }}>
                <Text>{receiptData.bookingStatus}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.gridColumn}>
            <Text style={styles.label}>Invoice Date</Text>
            <Text style={styles.value}>{receiptData.invoiceDate}</Text>
            
            <Text style={styles.label}>Due Date</Text>
            <Text style={styles.value}>{receiptData.dueDate}</Text>
            
            <Text style={styles.label}>Booking Date</Text>
            <Text style={styles.value}>{receiptData.bookingDate}</Text>
            
            <Text style={styles.label}>Tour Dates</Text>
            <Text style={styles.value}>{receiptData.assumeStartDate} to {receiptData.assumeEndDate}</Text>
          </View>
        </View>

        {/* Tour Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tour Details</Text>
          <View style={{
            backgroundColor: '#f3e8ff',
            padding: 15,
            borderRadius: 5,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#d8b4fe',
          }}>
            <Text style={{ marginBottom: 5, fontSize: 11 }}>
              <Text style={{ fontWeight: 700 }}>Tour: </Text>
              {receiptData.tourName}
            </Text>
            <Text style={{ marginBottom: 5, fontSize: 11 }}>
              <Text style={{ fontWeight: 700 }}>Package: </Text>
              {receiptData.packageName}
            </Text>
            <Text style={{ marginBottom: 5, fontSize: 11 }}>
              <Text style={{ fontWeight: 700 }}>Participants: </Text>
              {participantsCount} persons
            </Text>
            <Text style={{ fontSize: 10, color: '#666666', marginTop: 5 }}>
              {receiptData.tourDescription}
            </Text>
          </View>
        </View>

        {/* Package Price */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Package Price (Total)</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={{ ...styles.tableCellHeader, flex: 2 }}>Item</Text>
              <Text style={{ ...styles.tableCellHeader, flex: 3 }}>Description</Text>
              <Text style={{ ...styles.tableCellHeader, flex: 1, textAlign: 'right' }}>Amount</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 2 }}>Tour Package</Text>
              <Text style={{ ...styles.tableCell, flex: 3 }}>{receiptData.tourName} - {receiptData.packageName}</Text>
              <Text style={{ ...styles.tableCell, flex: 1, textAlign: 'right' }}>
                ${receiptData.packagePrice.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Activities */}
        {receiptData.activityDetailsList.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Activities (Per Person: ${activitiesTotalPerPerson.toFixed(2)} | Total: ${activitiesTotal.toFixed(2)})
            </Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={{ ...styles.tableCellHeader, flex: 2 }}>Activity</Text>
                <Text style={{ ...styles.tableCellHeader, flex: 3 }}>Description</Text>
                <Text style={{ ...styles.tableCellHeader, flex: 1, textAlign: 'center' }}>Participants</Text>
                <Text style={{ ...styles.tableCellHeader, flex: 1, textAlign: 'right' }}>Price/Person</Text>
              </View>
              
              {receiptData.activityDetailsList.map((activity, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={{ ...styles.tableCell, flex: 2 }}>{activity.activityName}</Text>
                  <Text style={{ ...styles.tableCell, flex: 3 }}>{activity.activityDescription}</Text>
                  <Text style={{ ...styles.tableCell, flex: 1, textAlign: 'center' }}>{activity.numberOfParticipants}</Text>
                  <Text style={{ ...styles.tableCell, flex: 1, textAlign: 'right' }}>
                    ${activity.pricePerPerson.toFixed(2)}
                  </Text>
                </View>
              ))}
              
              <View style={[styles.tableRow, styles.totalRow]}>
                <Text style={{ ...styles.tableCell, flex: 5, textAlign: 'right', fontWeight: 700 }}>
                  Activities Total Per Person:
                </Text>
                <Text style={{ ...styles.tableCell, flex: 1, textAlign: 'right', fontWeight: 700 }}>
                  ${activitiesTotalPerPerson.toFixed(2)}
                </Text>
              </View>
              
              <View style={[styles.tableRow, styles.highlightRow]}>
                <Text style={{ ...styles.tableCell, flex: 5, textAlign: 'right', fontWeight: 700 }}>
                  Activities Total (x{participantsCount}):
                </Text>
                <Text style={{ ...styles.tableCell, flex: 1, textAlign: 'right', fontWeight: 700 }}>
                  ${activitiesTotal.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Destinations */}
        {receiptData.destiantionDetails.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Destinations (Per Person: ${destinationsTotalPerPerson.toFixed(2)} | Total: ${destinationsTotal.toFixed(2)})
            </Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={{ ...styles.tableCellHeader, flex: 3 }}>Destination</Text>
                <Text style={{ ...styles.tableCellHeader, flex: 4 }}>Description</Text>
                <Text style={{ ...styles.tableCellHeader, flex: 2, textAlign: 'right' }}>Price/Person</Text>
              </View>
              
              {receiptData.destiantionDetails.map((destination, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={{ ...styles.tableCell, flex: 3 }}>{destination.destinationName}</Text>
                  <Text style={{ ...styles.tableCell, flex: 4 }}>{destination.destinationDescription}</Text>
                  <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right' }}>
                    ${destination.extraPrice.toFixed(2)}
                  </Text>
                </View>
              ))}
              
              <View style={[styles.tableRow, styles.totalRow]}>
                <Text style={{ ...styles.tableCell, flex: 7, textAlign: 'right', fontWeight: 700 }}>
                  Destinations Total Per Person:
                </Text>
                <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right', fontWeight: 700 }}>
                  ${destinationsTotalPerPerson.toFixed(2)}
                </Text>
              </View>
              
              <View style={[styles.tableRow, styles.highlightRow]}>
                <Text style={{ ...styles.tableCell, flex: 7, textAlign: 'right', fontWeight: 700 }}>
                  Destinations Total (x{participantsCount}):
                </Text>
                <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right', fontWeight: 700 }}>
                  ${destinationsTotal.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Accommodation */}
        {receiptData.accommodationDetailsList.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Accommodation (Per Person: ${accommodationsTotalPerPerson.toFixed(2)} | Total: ${accommodationsTotal.toFixed(2)})
            </Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={{ ...styles.tableCellHeader, flex: 1 }}>Day</Text>
                <Text style={{ ...styles.tableCellHeader, flex: 3 }}>Hotel</Text>
                <Text style={{ ...styles.tableCellHeader, flex: 2, textAlign: 'right' }}>Price/Person</Text>
                <Text style={{ ...styles.tableCellHeader, flex: 2, textAlign: 'right' }}>Transport/Person</Text>
                <Text style={{ ...styles.tableCellHeader, flex: 2, textAlign: 'right' }}>Day Total/Person</Text>
              </View>
              
              {receiptData.accommodationDetailsList.map((accommodation, index) => {
                const priceWithServiceCharge = accommodation.price * (100.0 + accommodation.serviceCharge) / 100;
                const discount = priceWithServiceCharge * accommodation.discount / 100;
                const tax = priceWithServiceCharge * accommodation.tax / 100;
                const dayTotalPerPerson = priceWithServiceCharge - discount + tax + accommodation.extraCharge + accommodation.transportPrice;
                
                return (
                  <View key={index} style={styles.tableRow}>
                    <Text style={{ ...styles.tableCell, flex: 1, textAlign: 'center' }}>{accommodation.dayNumber}</Text>
                    <Text style={{ ...styles.tableCell, flex: 3 }}>{accommodation.hotelName}</Text>
                    <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right' }}>${accommodation.price.toFixed(2)}</Text>
                    <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right' }}>${accommodation.transportPrice.toFixed(2)}</Text>
                    <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right', fontWeight: 700 }}>
                      ${dayTotalPerPerson.toFixed(2)}
                    </Text>
                  </View>
                );
              })}
              
              <View style={[styles.tableRow, styles.totalRow]}>
                <Text style={{ ...styles.tableCell, flex: 8, textAlign: 'right', fontWeight: 700 }}>
                  Accommodation Total Per Person:
                </Text>
                <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right', fontWeight: 700 }}>
                  ${accommodationsTotalPerPerson.toFixed(2)}
                </Text>
              </View>
              
              <View style={[styles.tableRow, styles.highlightRow]}>
                <Text style={{ ...styles.tableCell, flex: 8, textAlign: 'right', fontWeight: 700 }}>
                  Accommodation Total (x{participantsCount}):
                </Text>
                <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right', fontWeight: 700 }}>
                  ${accommodationsTotal.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Summary</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={{ ...styles.tableCellHeader, flex: 2 }}>Category</Text>
              <Text style={{ ...styles.tableCellHeader, flex: 2, textAlign: 'right' }}>Per Person</Text>
              <Text style={{ ...styles.tableCellHeader, flex: 2, textAlign: 'right' }}>Total (x{participantsCount})</Text>
            </View>
            
            {activitiesTotal > 0 && (
              <View style={styles.tableRow}>
                <Text style={{ ...styles.tableCell, flex: 2 }}>Activities</Text>
                <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right' }}>${activitiesTotalPerPerson.toFixed(2)}</Text>
                <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right' }}>${activitiesTotal.toFixed(2)}</Text>
              </View>
            )}
            
            {destinationsTotal > 0 && (
              <View style={styles.tableRow}>
                <Text style={{ ...styles.tableCell, flex: 2 }}>Destinations</Text>
                <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right' }}>${destinationsTotalPerPerson.toFixed(2)}</Text>
                <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right' }}>${destinationsTotal.toFixed(2)}</Text>
              </View>
            )}
            
            {accommodationsTotal > 0 && (
              <View style={styles.tableRow}>
                <Text style={{ ...styles.tableCell, flex: 2 }}>Accommodation</Text>
                <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right' }}>${accommodationsTotalPerPerson.toFixed(2)}</Text>
                <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right' }}>${accommodationsTotal.toFixed(2)}</Text>
              </View>
            )}
            
            <View style={[styles.tableRow, styles.highlightRow]}>
              <Text style={{ ...styles.tableCell, flex: 2, fontWeight: 700 }}>Package Price</Text>
              <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right', fontWeight: 700 }}>-</Text>
              <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right', fontWeight: 700 }}>
                ${receiptData.packagePrice.toFixed(2)}
              </Text>
            </View>
            
            <View style={[styles.tableRow, styles.totalRow]}>
              <Text style={{ ...styles.tableCell, flex: 2, fontWeight: 700 }}>Calculated Subtotal</Text>
              <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right', fontWeight: 700 }}>
                ${(activitiesTotalPerPerson + destinationsTotalPerPerson + accommodationsTotalPerPerson).toFixed(2)}
              </Text>
              <Text style={{ ...styles.tableCell, flex: 2, textAlign: 'right', fontWeight: 700 }}>
                ${calculatedSubtotal.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Final Price Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Final Price Summary</Text>
          <View style={{
            backgroundColor: '#f3e8ff',
            padding: 15,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#d8b4fe',
            borderRadius: 5,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={styles.value}>Total Amount:</Text>
              <Text style={styles.value}>${receiptData.totalAmount.toFixed(2)}</Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={styles.value}>Tax:</Text>
              <Text style={styles.value}>${receiptData.taxAmount.toFixed(2)}</Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={styles.value}>Discount:</Text>
              <Text style={[styles.value, styles.amountNegative]}>-${receiptData.discountAmount.toFixed(2)}</Text>
            </View>
            
            {receiptData.insuranceAmount && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <Text style={styles.value}>Insurance:</Text>
                <Text style={styles.value}>${receiptData.insuranceAmount.toFixed(2)}</Text>
              </View>
            )}
            
            <View style={{ 
              height: 1, 
              backgroundColor: '#d8b4fe', 
              marginVertical: 10 
            }} />
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={{ ...styles.value, fontWeight: 700 }}>Sub Total Amount:</Text>
              <Text style={{ ...styles.value, fontWeight: 700, color: '#8b5cf6' }}>
                ${receiptData.subtotal.toFixed(2)}
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={styles.value}>Amount Paid:</Text>
              <Text style={styles.value}>${receiptData.amountPaid.toFixed(2)}</Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={{ ...styles.value, fontWeight: 700 }}>Balance Due:</Text>
              <Text style={{ ...styles.value, fontWeight: 700, color: '#ef4444' }}>
                ${receiptData.balanceDue.toFixed(2)}
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 10, color: '#666666' }}>Final Amount (incl. all charges):</Text>
              <Text style={{ fontSize: 10, color: '#666666' }}>${receiptData.finalAmount.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Participants */}
        {receiptData.participentDetails.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Participants ({participantsCount})</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={{ ...styles.tableCellHeader, flex: 2 }}>Name</Text>
                <Text style={{ ...styles.tableCellHeader, flex: 1 }}>Date of Birth</Text>
                <Text style={{ ...styles.tableCellHeader, flex: 1 }}>Gender</Text>
                <Text style={{ ...styles.tableCellHeader, flex: 2 }}>Passport</Text>
                <Text style={{ ...styles.tableCellHeader, flex: 2 }}>Contact</Text>
              </View>
              
              {receiptData.participentDetails.map((participant, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={{ ...styles.tableCell, flex: 2 }}>
                    {participant.firstName} {participant.lastName}
                  </Text>
                  <Text style={{ ...styles.tableCell, flex: 1 }}>{participant.dateOfBirth}</Text>
                  <Text style={{ ...styles.tableCell, flex: 1 }}>{participant.gender}</Text>
                  <Text style={{ ...styles.tableCell, flex: 2 }}>{participant.passportNumber}</Text>
                  <Text style={{ ...styles.tableCell, flex: 2 }}>
                    {participant.email}{'\n'}{participant.mobileNumber}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>For any queries, please contact our customer service.</Text>
          <Text style={{ marginTop: 5 }}>Thank you for choosing our services!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFReceipt;