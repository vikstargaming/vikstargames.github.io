using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float moveSpeed = 5f;
    public float kickForce = 10f;
    public Rigidbody rb;
    public Transform kickPoint;

    private Vector3 moveInput;

    void Update()
    {
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        moveInput = new Vector3(h, 0, v).normalized;

        if (Input.GetKeyDown(KeyCode.Space))
        {
            KickBall();
        }
    }

    void FixedUpdate()
    {
        rb.MovePosition(rb.position + moveInput * moveSpeed * Time.fixedDeltaTime);
    }

    void KickBall()
    {
        Collider[] hit = Physics.OverlapSphere(kickPoint.position, 2f);
        foreach (Collider col in hit)
        {
            if (col.CompareTag("Ball"))
            {
                Rigidbody ballRb = col.GetComponent<Rigidbody>();
                Vector3 direction = (col.transform.position - transform.position).normalized;
                ballRb.AddForce(direction * kickForce, ForceMode.Impulse);
            }
        }
    }
}
